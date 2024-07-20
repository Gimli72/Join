"use strict";
import { sideBarTemplate } from './templates/sidebar-template.js';
import { headerTemplate } from './templates/header-template.js';
import { initialeCircleTemplate } from './templates/card-short.js';
import { cardOverlaySubtaskTemplate, cardOverlayContactTemplate, toggleSubtask, editTaskTemplate, cardOverlayHeader } from './templates/card-overlay.js';
import { headerInitiale } from './utils/navigation.js';
import { getElementById, getInputElementById } from './utils/standard.js';
// import { includeHTML } from './template-sidebar.js';
import { useRouter } from "../script/utils/router.js";
import { useAuth } from "../script/utils/use-auth.js";
import { useUsers } from './utils/use-users.js';
import { addClass, removeClass } from './utils/class.js';
import { useRemoteStorage } from './utils/remote-storage.js';
import * as addTask from '../script/addTask.js';
// import * as addSubTask from '../script/addSubTask.js';
import { } from '../script/utils/navigation.js';
import { btnInputAddSubtask, addedSubtasks, renderSubtaskDropdown } from "./addSubTask.js";
// import { activePrio, checkDueDate, checkSelectedContacts, checkSelectedPrio, checkTaskTitle, choosenContacts, clearAddTask, closeAllDropdowns, initAddTask, renderContactsDropdown, setTaskPrio, taskContactOK, taskDueDateOK, taskPrioOK, taskTitleOK } from './addTask.js';
import { addTaskTemplate } from './templates/add-task-template.js';
// await includeHTML();

export let givenState = '';
export let filterBoard = '';

/**
 * @typedef {import('../../types').User} User
 * @typedef {import('../../types').Task} Task
 */

const { navigateTo, currentPage } = useRouter();
const { checkAuthGuard } = useAuth();
const { findOneById, userInitiale } = await useUsers();
const { createItem, getItem } = useRemoteStorage();
let tasks = await getItem('keyProjects');
let dragAndDropInstance;

let { users } = await useUsers();

/** onOpenAddTaskOverlay(id)
 * show addTask overlay into board.html when (+)-Btn in stateLables is clicked
 * handover state to  generate a task with given state
 *  * 
 * @param {*} id 
 * @param {*} stateGiven 
 */
export function onOpenAddTaskOverlayIdState(id, stateGiven) {
    getElementById(id).addEventListener("click", function () {
        openAddTaskOverlay(stateGiven); // close addTaskOverlay onclick assigned-area | #id        
    });
    onCloseAddTaskOverlay();
}

/** oncloseShowAddTaskOverlay()
 * hide addTask overlay out off board.html when x-close-Btn is clicked
 */
function onCloseAddTaskOverlay() {
    getElementById("closeShowAddTaskOverlay").removeEventListener("click", closeAddTaskOverlay);
    getElementById("closeShowAddTaskOverlay").addEventListener("click", closeAddTaskOverlay);
}

/** openAddTaskOverlay()
 * close's addTaskOverlay
 */
export function openAddTaskOverlay(stateGiven) {
    addTask.initAddTask();
    btnInputAddSubtask();
    // addClass('#taskOverlay', 'hideTaskOverlay'); // closes taskOverlay when open addTaskOverlay
    addClass('#showAddTaskOverlay', 'showAddTaskOverlay');
    removeClass('#showAddTaskOverlay', 'hideAddTaskOverlay');
    removeClass('#closeShowAddTaskOverlay', 'd-none');
    givenState = stateGiven;
}

/** closeAddTaskOverlay()
 * open's addTaskOverlay
 */
export async function closeAddTaskOverlay() {
    addClass('#showAddTaskOverlay', 'hideAddTaskOverlay');
    removeClass('#showAddTaskOverlay', 'showAddTaskOverlay');
    addClass('#closeShowAddTaskOverlay', 'd-none');
    tasks = await getItem('keyProjects');
    renderBoard();
    dragAndDropInstance.updateElements();
}

export function renderBoard(filter = '') {
    clearBoard();
    tasks.forEach(task => {
        if (task.title.toLowerCase().startsWith(filter.toLowerCase())) {
            const html = taskTitle(task);
            getElementById(task.status).innerHTML += html;
        };
    });
    checkIfEmpty();
}

export function clearBoard() {
    const conditions = ['todo', 'progress', 'feedback', 'done'];
    conditions.forEach((condition) => {
        getElementById(condition).innerHTML = '';
    })
}

/**
 * 
 * @param {string} date 
 * @returns 
 */
export function dateConvert(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}

/** dummyTaskTitle(state)
 * renders an empty title into state-column of board.html when no task of the belonging state exist in tasks
 * @param {*} state 
 */
async function dummyTaskTitle(state) {
    let title = '';
    let txt = '';
    if (state === 'todo') {
        txt = 'No tasks To do';
    } else if (state === 'progress') {
        txt = 'No tasks In progress';
    } else if (state === 'feedback') {
        txt = 'No tasks Awaiting for Feedback';
    } else if (state === 'done') {
        txt = 'No tasks Done';
    }
    title = /*html*/`
        <div id="${state}-" class="emptyCard flex flex-col gap-24 ">
            <!-- Header -->
            <div>${txt}</div>
        </div> `;
    getElementById(state).innerHTML = title;
}

/** taskTitle(task)
 * @param { Task } task 
 * @returns a task title rendered in board.html, formed by the arguments off the handed task
 */
function taskTitle(task) {
    let title = '';
    title = /*html*/`
        <div id="${task.id}" draggable="true" class="card flex flex-col gap-24 draggable">
            <!-- Header -->
            <div class="classHeader ${task.category === 'User Story' ? 'classHeaderBlue' : 'classHeaderGreen'}">${task.category}</div>
            <!-- Title & Description -->
            <div class="flex flex-col gap-8">
                <div class="text-16px text-normal-700">${task.title}</div>
                <div class="text-16px text-normal-400 truncate">${task.description}</div>
        </div> `;
    if (task.subtask && task.subtask.length > 0) {
        const subtaskTotal = task.subtask.length;
        const subtaskDone = task.subtask.filter(subtask => subtask.status === true).length;
        let pc = subtaskDone / subtaskTotal * 100 + '%';
        title += /*html*/`
        <div class="flex gap-11 items-center justify-between pb-2 pr-8" id="cardProgressBar">
                <div class="progressBarContainer relative pb-6">
                    <div class="progressBarBg absolute">
                        <div class="progressBar absolute" id="progressBar" style="width: ${pc}"></div>
                    </div>
                </div>
                <div class="cardSubTasks text-12px text-normal-400">${subtaskDone}/${subtaskTotal} Subtasks</div>
            </div>
        `;
    };
    title += /*html*/`    
        <div class="cardInitiale flex justify-between w-full">
            <div class="flex ml-15">
                ${titleContacts(task)}
            </div>
            <!-- <img class="cardInitialePrio" src="./assets/img/medium.svg" alt=""> -->
            ${titlePrioIcon(task)}
        </div>
        </div>
    `;
    return title;
}

/** titleContacts(task)
 * 
 * @param {*} task 
 * @returns contact icons formed by the arguments off the handed task
 */
function titleContacts(task) {
    let contactsHtml = '';
    if (task.contacts) {
        for (const contact of task.contacts) {
            const user = users.find((user) => user.uid === contact);
            user ? contactsHtml += initialeCircleTemplate(user, userInitiale(user.name)) : '';
        }
    }
    return contactsHtml;
}


/** titlePrioIcon(task)
 * 
 * @param {*} task 
 * @returns an svg file matching the argument given off the handed task
 */
function titlePrioIcon(task) {
    let titlePrioIcon = '';
    if (task.prio === 'urgent') {
        titlePrioIcon = './assets/img/urgentIcon.svg';
    } else if (task.prio === 'medium') {
        titlePrioIcon = './assets/img/mediumIcon.svg';
    } else if (task.prio === 'low') {
        titlePrioIcon = './assets/img/lowIcon.svg';
    }
    return /* html */ `<img class="cardInitialePrio" src="${titlePrioIcon}" alt="">`;
}


/** taskOverlayListener(tasks)
 * adds click-btn's to taskOverlay
 * @param {*} tasks 
 */
function taskOverlayListener(tasks) {
    tasks.forEach(task => {
        if (filterBoard === undefined || task.title.toLowerCase().startsWith(filterBoard.toLowerCase())) {
            getElementById(task.id).addEventListener("click", async (event) => {
                openTaskOverlay();
                taskOverlay(task.id);
                getElementById('cardOverlayHeaderImg').addEventListener("click", closeTaskOverlay);
                getElementById('deleteTask').addEventListener('click', () => {
                    deleteTask(task.id);
                });  // (delete)-btn, delete task  | bottom- right 
            })
        }
    })
};


/** taskOverlay(id)
 *  renders taskOverlay into board.html
 * @param {*} id 
 */
function taskOverlay(id) {

    let task = tasks.find(taskskey => taskskey.id === id);

    const currentSection = getElementById('taskOverlay');

    let html = '';
    html += cardOverlayHeader(task, dateConvert(task.dueDate));    // function in board.js cardOverlayHeader = (task, date)
    currentSection.innerHTML = html;

    const contactsSection = getElementById('cardOverlayContacts');
    let contactsHtml = '';

    const subtasksSection = getElementById('cardOverlaySubtasks');
    let subtasksHtml = '';

    if (task.contacts) { 
        for (const contact of task.contacts) {
            const user = findOneById(contact);            
            user ? contactsHtml += cardOverlayContactTemplate(user) : '';      // z005 | import { .. cardOverlayContactTemplate } from './templates/card-overlay.js';
        }
        contactsSection.innerHTML = contactsHtml;
    }

    if (task.subtask) {
        task.subtask ? task.subtask.forEach((subtask) => {
            subtasksHtml += cardOverlaySubtaskTemplate(subtask);   // z005 | import { .. cardOverlaySubtaskTemplate } from './templates/card-overlay.js';
        }) : '';
        subtasksSection.innerHTML = subtasksHtml;

        task.subtask ? task.subtask.forEach((subtask) => {
            toggleSubtask(subtask);
        }) : '';
    }
}

/** openTaskOverlay()
 * open taskOverlay onclick assigned-area
 */
async function openTaskOverlay() {
    addClass('#showAddTaskOverlay', 'hideAddTaskOverlay'); // closes addTaskOverlay when open taskOverlay
    addClass('#taskOverlay', 'showTaskOverlay');
    removeClass('#taskOverlay', 'hideTaskOverlay');
    removeClass('#taskOverlay', 'd-none');
}

/** closeTaskOverlay()
 * close taskOverlay onclick assigned-area
 */
async function closeTaskOverlay() {   
    addClass('#taskOverlay', 'hideTaskOverlay');
    removeClass('#taskOverlay', 'showTaskOverlay');
    removeClass('#taskOverlay', 'd-none');
    createItem('keyProjects', tasks);
    renderBoard();
    dragAndDropInstance.updateElements();
}

/** deleteTask(id)
 * delete task on "click" in taskOverlay in board.html
 * @param {*} id 
 */
async function deleteTask(id) {
    let task = tasks.find(taskskey => taskskey.id === id);
    tasks = await getItem('keyProjects');
    tasks = tasks.filter((tasks) => tasks.id !== id);
    createItem('keyProjects', tasks);
    closeTaskOverlay();
    // tasks = await getItem('keyProjects');
    renderBoard();
    dragAndDropInstance.updateElements();
    // initBoard();
}

class DragAndDrop {
    constructor() {
        this.draggableItems = document.querySelectorAll('.draggable');
        this.containers = document.querySelectorAll('.container-board');
        this.initEvents();
    }

    initEvents() {
        this.draggableItems.forEach(draggable => {
            draggable.addEventListener('dragstart', this.handleDragStart);
            draggable.addEventListener("click", () => {
                openTaskOverlay();
                taskOverlay(draggable.id);
                getElementById('cardOverlayHeaderImg').removeEventListener("click", closeTaskOverlay);
                getElementById('cardOverlayHeaderImg').addEventListener("click", closeTaskOverlay);            // (x)-btn, close taskOverlay | top-right       
                getElementById('deleteTask').addEventListener("click", () => { deleteTask(draggable.id) });   // (delete)-btn, delete task  | bottom- right          
                getElementById('editTask').addEventListener("click", () => { editTask(draggable.id) });
            })
        });

        this.containers.forEach(container => {
            container.addEventListener('dragover', this.handleDragOver);
            container.addEventListener('drop', this.handleDrop);
        });
    }

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    handleDrop(event) {
        event.preventDefault();
        const getTaskId = event.dataTransfer.getData('text/plain');
        const draggableItem = document.getElementById(getTaskId);
        const targetContainer = event.target.closest('.container-board');
        const presentContainer = document.getElementById(`${targetContainer.id}`);
        const presentContainerDraggableItemsCount = presentContainer ? presentContainer.querySelectorAll('.draggable') : '';
        presentContainerDraggableItemsCount.length < 1 && (targetContainer.innerHTML = '');
        targetContainer.appendChild(draggableItem);
        updateStatus(getTaskId, targetContainer.id);
        checkIfEmpty();
    }

    updateElements() {
        this.draggableItems.forEach(draggable => {
            draggable.removeEventListener('dragstart', this.handleDragStart);
        });

        this.containers.forEach(container => {
            container.removeEventListener('dragover', this.handleDragOver);
            container.removeEventListener('drop', this.handleDrop);
        });

        this.draggableItems = document.querySelectorAll('.draggable');
        this.containers = document.querySelectorAll('.container-board');
        this.initEvents();
    }
}

function checkIfEmpty() {
    const containers = document.querySelectorAll('.container-board');
    containers.forEach(container => {
        // Wenn der Container keine .draggable Kinder hat, rufen wir LEER auf
        if (container.querySelectorAll('.draggable').length === 0) {
            dummyTaskTitle(container.id);
        }
    });
}

function updateStatus(taskId, status) {
    let changedTask = tasks.find((task) => task.id === taskId);
    changedTask.status = status;
    createItem('keyProjects', tasks);
    // renderBoard();
}

getElementById('includeSideBar').innerHTML = sideBarTemplate();  // z002 | import { sideBarTemplate } from './templates/sidebar-template.js';
getElementById('includeHeader').innerHTML = headerTemplate();    // z003 | import { headerTemplate } from './templates/header-template.js';
getElementById('userInitials') ? headerInitiale() : '';          // z006 | import { headerInitiale } from './utils/navigation.js';
removeClass('#container', 'done');

if (currentPage === '/board.html') {
    /** run function renderBoard(renderTask(status)) function whenever filter changes
     * recognize change of filter with every input 
     */
    getElementById('boardFilter').addEventListener('input', async (event) => {
        const filter = event.target instanceof HTMLInputElement ? event.target.value : '';
        renderBoard(filter);
        dragAndDropInstance.updateElements();
    });

    /** run function renderAvailableContacts(filter) function whenever filter changes
     * recognize change of filter with every input 
     */
    getElementById('filterContacts').addEventListener('input', (event) => {
        const filter = event.target instanceof HTMLInputElement ? event.target.value : '';
        addTask.renderContactsDropdown(filter);
    });

    renderBoard();
    checkIfEmpty();
    dragAndDropInstance = new DragAndDrop();
    onOpenAddTaskOverlayIdState('openAddTaskOverlay', 'todo');
    onOpenAddTaskOverlayIdState('todoAddTaskBtn', 'todo');
    onOpenAddTaskOverlayIdState('progressAddTaskBtn', 'progress');
    onOpenAddTaskOverlayIdState('feedbackAddTaskBtn', 'feedback');
}


function editTask(id) {

    const edit = true;
    getElementById('showAddTaskOverlay').innerHTML = '';  

    let task = tasks.find(taskskey => taskskey.id === id);
    const currentSection = getElementById('taskOverlay');
    let html = '';
    html += editTaskTemplate(task);
    currentSection.innerHTML = html;

    getElementById('taskDescription').textContent = task.description;
    addTask.setTaskPrio(task.prio);

    for (let i = 0; i < task.contacts.length; i++) {
        addTask.choosenContacts[i] = task.contacts[i];
    }
    for (let i = 0; i < task.subtask.length; i++) {
        addedSubtasks[i] = task.subtask[i];
    }    

    const addCloseClickListener = (elementId, callback) => {
        const element = getElementById(elementId);
        if (element) {
            element.addEventListener("click", callback);
        }
    };

    addCloseClickListener('cardOverlayHeaderImg', () => exitEditTask());
    addCloseClickListener('editChangesOk', () => saveEditTask(task));
    btnInputAddSubtask(edit);
    addTask.initAddTask(edit);
    addTask.closeAllDropdowns(edit);
    renderSubtaskDropdown();
}

function saveEditTask(task) {

    addTask.checkTaskTitle();
    addTask.checkSelectedContacts();
    addTask.checkDueDate();

    if (addTask.taskTitleOK && addTask.taskContactOK && addTask.taskDueDateOK) {
        const updateContactData = {
            'title': getInputElementById('taskTitle').value,
            'description': getInputElementById('taskDescription').value,
            'dueDate': getInputElementById('taskDueDate').value,
            'prio': addTask.activePrio,
            'contacts': addTask.choosenContacts,
            'subtask': addedSubtasks
        }
        const index = tasks.findIndex(t => t.id === task.id);      
        tasks[index] = { ...tasks[index], ...updateContactData };       

        exitEditTask();
    }  
}

function exitEditTask() {
    getElementById('showAddTaskOverlay').innerHTML = addTaskTemplate();
    onCloseAddTaskOverlay();
    addTask.clearAddTask();
    closeTaskOverlay();
}