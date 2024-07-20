'use strict';
import { sideBarTemplate } from './templates/sidebar-template.js';
import { headerTemplate } from './templates/header-template.js';
import { getElementById, getImageElementById, getInputElementById } from './utils/standard.js';
import { headerInitiale } from './utils/navigation.js';
import { useUsers } from './utils/use-users.js';
import { uuid } from './utils/crypto.js';
import { removeClass } from './utils/class.js';
import { useRemoteStorage } from './utils/remote-storage.js';
// import { } from './utils/navigation.js';
import { resetStyleInputAddSubtask, btnInputAddSubtask, addedSubtasks, clearAddTaskSubtask } from "./addSubTask.js";
import { useRouter } from "../script/utils/router.js";
// import { includeHTML } from './template-sidebar.js';
import { addTaskTemplate } from './templates/add-task-template.js';
import { givenState, closeAddTaskOverlay } from '../script/board.js'

// await includeHTML();

const { currentPage } = useRouter();

/**
 * @typedef {import('../../types').Task} Task
 */

const { userInitiale } = await useUsers();
const { createItem, getItem } = useRemoteStorage();

let { users } = await useUsers();

// global variables for testing
let taskCategorys = [ // selectable categories
    "User Story",
    "Technical Task"
];

let taskContacts = users; // selectable contacts

// global variables

const checkImages = [
    "./assets/img/addTaskImg/checkSingleContact.svg",               // checkbox-icon     contact not selected
    "./assets/img/addTaskImg/loggedSingleContact.svg",              // checkbox-icon     contact selected
];

const checkStyles = [
    {
        "img": "./assets/img/addTaskImg/checkSingleContact.svg",    // checkbox-icon     contact not selected
        "bg": "var(--header-color)",                                // bg-color          contact not selected  
        "bgHover": "var(--globalBgColor)",                          // hover-bg-color    contact not selected  
        "color": "var(--globalColorPrime)",                         // text-color        contact not selected
    },
    {
        "img": "./assets/img/addTaskImg/loggedSingleContact.svg",   // checkbox-icon     contact selected
        "bg": "var(--side-bar-color)",                              // bg-color          contact selected
        "bgHover": "var(--side-bar-hover)",                         // hover-bg-color    contact selected  
        "color": "var(--txt-color-hover)",                          // text-color        contact selected
    }
];

/**
 * @type {Task[] | null}
 */
let tasks = [];

// Delete ALL TASKS on server
// createItem('keyProjects', tasks);

tasks = await getItem('keyProjects');

// temporary variables
export let taskTitleOK, taskDescriptionOK, taskContactOK, taskDueDateOK, taskPrioOK, taskCategoryOK, taskSubtaskOK = false;
let taskTitle = '';
let taskDescription = '';
let taskContact = '';
export let choosenContacts = [];
let taskDueDate = '';
export let activePrio = '';
let activePrioNO = null;
let taskCategory = '';
let taskSubtask = '';

/**
 * @type {Task}
 */
let newTask = {
    id: uuid(),
    title: '',
    description: '',
    contacts: [],
    dueDate: '',
    prio: '',
    category: '',
    subtask: [],
    status: '',
};

/** initAddTask()
 * 
 */
export async function initAddTask(edit = false) {
    getElementById('taskTitle').addEventListener("click", () => { closeAllDropdowns(edit); });
    getElementById('taskDescription').addEventListener("click", () => { closeAllDropdowns(edit); });
    getElementById('taskDueDate').addEventListener("click", () => { closeAllDropdowns(edit); });
    getElementById('taskContacts').addEventListener("click", () => { renderContactsDropdown('', edit); });
    
    getElementById('taskPrioUrgent').addEventListener("click", () => {
        closeAllDropdowns(edit);
        setTaskPrio(getElementById('taskPrioUrgent').getAttribute('data-prio'));
    });
    getElementById('taskPrioMedium').addEventListener("click", () => {
        closeAllDropdowns(edit);
        setTaskPrio(getElementById('taskPrioMedium').getAttribute('data-prio'));
    });
    getElementById('taskPrioLow').addEventListener("click", () => {
        closeAllDropdowns(edit);
        setTaskPrio(getElementById('taskPrioLow').getAttribute('data-prio'));
    });

    if (!edit) {
        getElementById('taskCategory').addEventListener("click", renderCategoryDropdown);
        getElementById('clearAddTask').addEventListener("click", clearAddTask);
        getElementById('createAddTask').addEventListener("click", createAddTask);
    }
}


/** renderContactsDropdown()
 * render selectable contacts
 */
export function renderContactsDropdown(filter, edit = false) {
    getElementById('contactsDropdown').style.visibility = 'visible';
    let dropdownField = '';
    for (let i = 0; i < taskContacts.length; i++) {
        if (filter === undefined || taskContacts[i].name.toLowerCase().startsWith(filter.toLowerCase())) {
            dropdownField += /* html */ `
                <div id="ddiContacts_${i}" class="ddiContacts">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                        <div id="circle_${i}" data-id="${i}" class="circle" style="background-color: ${(taskContacts[i].color)};">${userInitiale(taskContacts[i].name)}</div>
                        <div id="contactTxt_${i}">${taskContacts[i].name}</div>
                    </div>
                    <img id="checkboxContact_${i}" src="./assets/img/addTaskImg/checkSingleContact.svg" alt="">
                </div>
            `;
        }
    }
    getElementById('contactsDropdown').innerHTML = dropdownField;
    renderContactFunctionality(filter); // fügt den verfügbaren kontakten toggle funktionen hinzu
    initializeContacts(filter);

    styleInputContactsDropdown();
}


/** initializeContacts(filter) renders available contacts wether contact is selected or not
* filtered when a filter is passed to the function
*/
function initializeContacts(filter) {
    for (let i = 0; i < taskContacts.length; i++) {
        if (filter === '' || taskContacts[i].name.toLowerCase().startsWith(filter.toLowerCase())) {    // just render contact which fit to filter or all if no active filter   
            if (choosenContacts.length === 0) { // no choosen contacts => render filtered contacts as not selected
                styleContacts(i, 0); 
            } else if ( Object.values(taskContacts[i]).some(value => choosenContacts.includes(value))) { // contact matches filter and already selected => render as selected
                styleContacts(i, 1); 
            } else { // contact matches filter but is not selected => render as NOT selected
                styleContacts(i, 0);
            }}}};


/** styleInputContactsDropdown() | style and reconfigure inputfield contacts */
export function styleInputContactsDropdown() {
    getElementById('contactsArrow').style.transform = 'rotate(180deg)';
    getElementById('taskContacts').style.border = 'solid 1px var(--globalColorSecond)';
    // closeCategoryDropdown();
    // closeSubtaskDropdown();
    resetStyleInputAddSubtask();
    getElementById('taskContacts').removeEventListener("click", (event) => {
        renderContactsDropdown('');});
    getElementById('taskContacts').addEventListener("click", closeContactsDropdown);
}


export function renderContactFunctionality(filter) { 
    for (let i = 0; i < users.length; i++) {  
        if (filter === undefined || taskContacts[i].name.toLowerCase().startsWith(filter.toLowerCase())) {
            let currentIndex = contactState(i); // start with the first style-set
            getElementById(`ddiContacts_${i}`).addEventListener('click', () => {
                currentIndex++; // move to the next style-set in the array
                if (currentIndex >= checkImages.length) {
                    currentIndex = 0; // reset to first style-set if at the end
                };
                styleContacts(i, currentIndex); 
                toggleColaborateur(taskContacts[i]) // run function to add or remove contact to colaborator-list
            });
        };
    };
};


/** contactState(i) returns the state wether the contact is selected or not */
function contactState(i) {
    let contactState; // = choosenContacts.indexOf(item => item.uid === elementToToggle[i].uid ? 0 : -1);
    if (Object.values(taskContacts[i]).some(value => choosenContacts.includes(value))) { // object:key:value match to some array:item
        contactState = 1;
    } else {
        contactState = 0;
    };
    return contactState;
};


/** styleContacts(uid, currentIndex), styles contacs when rendered
 *  possible styles are
 *  0 : not selected
 *  1 : selected
 * @param {*} uid 
 * @param {*} currentIndex 
 */
function styleContacts(uid, currentIndex) {
    getImageElementById(`checkboxContact_${uid}`).src = checkStyles[currentIndex].img; // update the image source
    getElementById(`ddiContacts_${uid}`).style.backgroundColor = checkStyles[currentIndex].bg; // update the bg-color
    getElementById(`ddiContacts_${uid}`).addEventListener("mouseover", (event) => {mouseOver(`ddiContacts_${uid}`, checkStyles[currentIndex].bgHover)});
    getElementById(`ddiContacts_${uid}`).addEventListener("mouseout", (event) => {mouseOut(`ddiContacts_${uid}`, checkStyles[currentIndex].bg)});
    getElementById(`ddiContacts_${uid}`).style.color = checkStyles[currentIndex].color; // update the txt-color           
}


export function mouseOver(index, bgColor) {
    getElementById(index).style.backgroundColor = bgColor;
}


export function mouseOut(index, bgColor) {
    getElementById(index).style.backgroundColor = bgColor;
}


/** toggleColaborateur(contact) toggels a contact-object to an array of contact-objects
 * @param {*} contact 
 */
export function toggleColaborateur(contact) {
    let elementToToggle = contact;
    let index = choosenContacts.indexOf(elementToToggle.uid);
    if (index > -1) {
        choosenContacts.splice(index, 1);
    } else {
        choosenContacts.push(contact.uid);    
    }
}


/** contactsSummary() renders short-summary of selected contacts when dropdown-contacts closes
* just colored circle with initials
*/
export function contactsSummary() {
    let content = '';
    let index = -1;
    for (let i = 0; i < choosenContacts.length; i++) {
        index = taskContacts.findIndex(item => item.uid == choosenContacts[i]);
        content += /*html*/`
            <div id="contactLogo_${i}" class="contactInitial" style="background-color: ${taskContacts[index].color}">
                ${userInitiale(taskContacts[index].name)}
            </div>
        `;
    }
    getElementById('contactSummary').innerHTML = content;
}


/** renderCategoryDropdown()
 * render selectable categorys
 */
export function renderCategoryDropdown() {
    getElementById('categoryDropdown').style.visibility = 'visible';
    let dropdownField = '';
    for (let i = 0; i < taskCategorys.length; i++) {
        dropdownField += /* html */ `<div id="ddiCategory_${i}" class="ddiCategory">${taskCategorys[i]}</div>`;
    }
    getElementById('categoryDropdown').innerHTML = dropdownField;
    for (let i = 0; i < taskCategorys.length; i++) {
        getElementById(`ddiCategory_${i}`).addEventListener("click", (event) => { logInCategory(i) });
    }
    styleInputCategoryDropdown();
}


/** styleInputCategoryDropdown() | style and reconfigure inputfield category */
export function styleInputCategoryDropdown() {
    getElementById('categoryArrow').style.transform = 'rotate(180deg)';
    getElementById('taskCategory').style.border = 'solid 1px var(--globalColorSecond)';
    closeContactsDropdown();
    // closeSubtaskDropdown();
    resetStyleInputAddSubtask();
    getElementById('taskCategory').removeEventListener("click", renderCategoryDropdown);
    getElementById('taskCategory').addEventListener("click", closeCategoryDropdown);
}


/** logInCategory(choosenCategoryID)
 * log in choosen category to new task
 * @param {*} choosenCategoryID 
 */
export function logInCategory(choosenCategoryID) {
    getElementById('selectedCategory').innerHTML = taskCategorys[choosenCategoryID];
    getElementById('selectedCategory').style.color = '#2A3647';
    closeCategoryDropdown();
    getElementById('taskCategory').style.border = 'solid 1px var(--globalInputBorderColor)';
    getElementById('categoryArrow').style.transform = 'rotate(0deg)';
    taskCategory = taskCategorys[choosenCategoryID];
}


/* formerly subtask funktions */


/** setTaskPrio(selection)
 * log in choosen priority to new task
 * @param {*} selection 
 */
export function setTaskPrio(selection) {
    if (selection === 'urgent') {
        getElementById('taskPrioUrgent').style.background = 'rgba(255, 61, 0, 1)';
        getElementById('taskPrioUrgent').style.color = 'rgba(255, 255, 255, 1)';
        getImageElementById('urgentIcon').src = './assets/img/addTaskImg/urgentIconSelected.svg';

        getElementById('taskPrioMedium').style.background = 'rgba(255, 255, 255, 1)';
        getElementById('taskPrioMedium').style.color = 'rgb(132,132,132)';
        getImageElementById('mediumIcon').src = './assets/img/addTaskImg/mediumIcon.svg';

        getElementById('taskPrioLow').style.background = 'rgba(255, 255, 255, 1)';
        getElementById('taskPrioLow').style.color = 'rgb(132,132,132)';
        getImageElementById('lowIcon').src = './assets/img/addTaskImg/lowIcon.svg';

        activePrioNO = 0;
    } else if (selection === 'medium') {
        getElementById('taskPrioUrgent').style.background = 'rgba(255, 255, 255, 1)';
        getElementById('taskPrioUrgent').style.color = 'rgb(132,132,132)';
        getImageElementById('urgentIcon').src = './assets/img/addTaskImg/urgentIcon.svg';

        getElementById('taskPrioMedium').style.background = 'rgba(255, 168, 0, 1)';
        getElementById('taskPrioMedium').style.color = 'rgba(255, 255, 255, 1)';
        getImageElementById('mediumIcon').src = './assets/img/addTaskImg/mediumIconSelected.svg';

        getElementById('taskPrioLow').style.background = 'rgba(255, 255, 255, 1)';
        getElementById('taskPrioLow').style.color = 'rgb(132,132,132)';
        getImageElementById('lowIcon').src = './assets/img/addTaskImg/lowIcon.svg';
        activePrioNO = 1;
    } else if (selection === 'low') {
        getElementById('taskPrioUrgent').style.background = 'rgba(255, 255, 255, 1)';
        getElementById('taskPrioUrgent').style.color = 'rgb(132,132,132)';
        getImageElementById('lowIcon').src = './assets/img/addTaskImg/lowIconSelected.svg';

        getElementById('taskPrioMedium').style.background = 'rgba(255, 255, 255, 1)';
        getElementById('taskPrioMedium').style.color = 'rgb(132,132,132)';
        getImageElementById('mediumIcon').src = './assets/img/addTaskImg/mediumIcon.svg';

        getElementById('taskPrioLow').style.background = 'rgba(122, 226, 41, 1)';
        getElementById('taskPrioLow').style.color = 'rgba(0, 0, 0, 1)';
        getImageElementById('lowIcon').src = './assets/img/addTaskImg/lowIconSelected.svg';
        activePrioNO = 2;
    } else if (selection === '') {
        getElementById('taskPrioUrgent').style.background = 'rgba(255, 255, 255, 1)';
        getElementById('taskPrioUrgent').style.color = 'rgb(132,132,132)';
        getImageElementById('lowIcon').src = './assets/img/addTaskImg/lowIcon.svg';

        getElementById('taskPrioMedium').style.background = 'rgba(255, 255, 255, 1)';
        getElementById('taskPrioMedium').style.color = 'rgb(132,132,132)';
        getImageElementById('mediumIcon').src = './assets/img/addTaskImg/mediumIcon.svg';

        getElementById('taskPrioLow').style.background = 'rgba(255, 255, 255, 1';
        getElementById('taskPrioLow').style.color = 'rgb(132,132,132)';
        getImageElementById('lowIcon').src = './assets/img/addTaskImg/lowIcon.svg';
        activePrioNO = null;
    }
    activePrio = selection;
}


/** clearAddTask() | reset complete formular
 * clear addTask formular to restart addTask
 */
export function clearAddTask() {
    // taskTitleOK, taskContactOK, taskDueDateOK, taskPrioOK,
    taskCategoryOK = false;
    clearAddTaskTitle();
    clearAddTaskDescription();
    clearAddTaskContacts();
    clearAddTaskDueDate();
    clearAddTaskPrio();
    clearAddTaskCategory();
    clearAddTaskSubtask();
    closeCategoryDropdown();
    resetStyleInputAddSubtask();
    // startInputAddSubtask();
    closeContactsDropdown();
}


/** clearAddTaskTitle() | reset title input-field */
export function clearAddTaskTitle() {
    taskTitleOK = false;
    getInputElementById('taskTitle').value = ''
    getElementById('titleFieldRequired').style.color = 'var(--globalBgColor)';
    getElementById('taskTitle').style.border = 'solid 1px var(--globalInputBorderColor)';
}


/** clearAddTaskDescription() | reset description input-field */
export function clearAddTaskDescription() {
    getInputElementById('taskDescription').value = '';
    getElementById('titleFieldRequired').style.color = 'var(--globalBgColor)';
}


/** clearAddTaskContacts() | reset contacts input-field */
export function clearAddTaskContacts() {
    getElementById('filterContacts').innerHTML = 'Select contacts to asign';
    getElementById('filterContacts').style.color = 'rgb(132,132,132)';
    getElementById('contactFieldRequired').style.color = 'var(--globalBgColor)';
    getElementById('taskContacts').style.border = 'solid 1px var(--globalInputBorderColor)';
    getElementById('contactsArrow').style.transform = 'rotate(0deg)';
    taskContact = '';
    choosenContacts = [];
    closeContactsDropdown();
}


/** closeContactsDropdown() | close contacts input-field */
export function closeContactsDropdown() {
    getElementById("contactsDropdown").innerHTML = '';
    getElementById('taskContacts').style.border = 'solid 1px var(--globalInputBorderColor)';
    getElementById('contactsArrow').style.transform = 'rotate(0deg)';
    getElementById('taskContacts').removeEventListener("click", closeContactsDropdown);
    getElementById('taskContacts').addEventListener("click", (event) => {
        renderContactsDropdown('');
    });
    getInputElementById('filterContacts').value = '';
    contactsSummary(); // run function to render contactsSummary short-list
}


/** clearAddTaskDueDate() | reset dueDate input-field */
export function clearAddTaskDueDate() {
    getInputElementById('taskDueDate').value = '';
    getElementById('dateFieldRequired').style.color = 'var(--globalBgColor)';
    getElementById('taskDueDate').style.border = 'solid 1px var(--globalInputBorderColor)';
}


/** clearAddTaskPrio() | reset priority input-field */
export function clearAddTaskPrio() {
    setTaskPrio('');
    getElementById('prioFieldRequired').style.color = 'var(--globalBgColor)';
    getElementById('taskPrioUrgent').style.border = 'solid 1px var(--globalInputBorderColor)';
    getElementById('taskPrioMedium').style.border = 'solid 1px var(--globalInputBorderColor)';
    getElementById('taskPrioLow').style.border = 'solid 1px var(--globalInputBorderColor)';
}


/** clearAddTaskCategory() | reset category input-field */
export function clearAddTaskCategory() {
    getElementById('selectedCategory').innerHTML = 'Select a task category';
    getElementById('selectedCategory').style.color = 'rgb(132,132,132)';
    getElementById('categoryFieldRequired').style.color = 'var(--globalBgColor)';
    getElementById('taskCategory').style.border = 'solid 1px var(--globalInputBorderColor)';
    getElementById('categoryArrow').style.transform = 'rotate(0deg)';
    // taskCategory = [];
    closeCategoryDropdown();
}


/** closeCategoryDropdown() | close category input-field */
export function closeCategoryDropdown() {
    getElementById("categoryDropdown").innerHTML = '';
    getElementById('taskCategory').style.border = 'solid 1px var(--globalInputBorderColor)';
    getElementById('categoryArrow').style.transform = 'rotate(0deg)';
    getElementById('taskCategory').removeEventListener("click", closeCategoryDropdown);
    getElementById('taskCategory').addEventListener("click", renderCategoryDropdown);
}


/* formerly subtask funktions */


/** closeAllDropdowns() | close dropdown fields when other input on focus */
export function closeAllDropdowns(edit = false) {
    closeContactsDropdown();
    !edit ? closeCategoryDropdown() : '';
    // closeSubtaskDropdown();
    resetStyleInputAddSubtask();
}


/** createAddTask()
 * check required addTaskSections before checkNewTask to backend server
 */
export function createAddTask() {
    checkTaskTitle();
    checkSelectedContacts();
    checkDueDate();
    checkSelectedPrio();
    checkSelectedCategory();
    checkNewTask(); // check whole new task formular before save and send to backend-storage-server
}


/** setTaskState()
 * set state of new Task as given by calling button in board.html
 * default === 'todo'
 * @returns 
 */
function setTaskState() {
    let newState = '';
    if (givenState === 'todo') {
        newState = 'todo'
    } else if ( givenState === 'progress') {
        newState = 'progress'
    } else if ( givenState === 'feedback') {
        newState = 'feedback'
    } else if ( givenState === 'done') {
        newState = 'done'
    } else {
        newState = 'todo'
    }
    return newState;
}

// TODO - tgreff - message addTask succesfully
/** checkNewTask() | check whole new task formular before save and send to backend-storage-server */
export async function checkNewTask() {
    if (taskTitleOK && taskContactOK && taskDueDateOK && taskPrioOK && taskCategoryOK) {
        newTask = {
            id: uuid(),
            title: taskTitle,
            description: getInputElementById('taskDescription').value,
            contacts: choosenContacts, // taskContact, // [],
            dueDate: taskDueDate,
            prio: activePrio,
            category: taskCategory,
            subtask: addedSubtasks, // [],
            status: setTaskState(),
        };
        tasks = await getItem('keyProjects');
        tasks ? tasks.push(newTask) : '';
        createItem('keyProjects', tasks);        
        showAddedTaskMessage();
        clearAddTask();
    }
}


/** showAddedTaskMessage() shows message after new task was added to tasks */
async function showAddedTaskMessage() {
    getElementById('taskAddMessage').style.display = 'flex';
    setTimeout( function() {
        getElementById('taskAddMessage').style.display = 'none';
        currentPage === '/board.html' ? closeAddTaskOverlay() : '';
    }, 2500);
}


/** check TaskTitle()
 * check if input taskTitle is filled
 * render message if not
 */
export function checkTaskTitle() {
    if (getInputElementById('taskTitle').value === '') {
        getElementById('titleFieldRequired').style.color = 'var(--txt-color-required)';
        getElementById('taskTitle').style.border = 'solid 1px var(--txt-color-required)';
        taskTitleOK = false;
    } else {
        getElementById('titleFieldRequired').style.color = 'var(--globalBgColor)';
        getElementById('taskTitle').style.border = 'solid 1px var(--globalInputBorderColor)';
        taskTitle = getInputElementById('taskTitle').value;
        taskTitleOK = true;
    }
}


/** check filterContacts()
 * check if input filterContacts is filled
 * render message if not
 */
export function checkSelectedContacts() {
    if (choosenContacts.length === 0 ) {
        getElementById('contactFieldRequired').style.color = 'var(--txt-color-required)';
        getElementById('taskContacts').style.border = 'solid 1px var(--txt-color-required)';
        taskContactOK = false;
    } else {
        getElementById('contactFieldRequired').style.color = 'var(--globalBgColor)';
        taskContactOK = true;
    }
}


// TODO -tgreff- datepicker fixen
/** check DueDate()
 * check if input taskDueDate is filled
 * render message if not
 */
export function checkDueDate() {
    if (getInputElementById('taskDueDate').value === '') {
        getElementById('dateFieldRequired').style.color = 'var(--txt-color-required)';
        getElementById('taskDueDate').style.border = 'solid 1px var(--txt-color-required)';
        taskDueDateOK = false;
    } else {
        getElementById('dateFieldRequired').style.color = 'var(--globalBgColor)';
        getElementById('taskDueDate').style.border = 'solid 1px var(--globalInputBorderColor)';
        taskDueDate = getInputElementById('taskDueDate').value;
        taskDueDateOK = true;
    }
}


/** check checkSelectedPrio()
 * check if input taskPrio is filled
 * render message if not
 */
export function checkSelectedPrio() {
    if (activePrio === '') {
        getElementById('prioFieldRequired').style.color = 'var(--txt-color-required)';
        getElementById('taskPrioUrgent').style.border = 'solid 1px var(--txt-color-required)';
        getElementById('taskPrioMedium').style.border = 'solid 1px var(--txt-color-required)';
        getElementById('taskPrioLow').style.border = 'solid 1px var(--txt-color-required)';
        taskPrioOK = false;
    } else {
        getElementById('prioFieldRequired').style.color = 'var(--globalBgColor)';
        getElementById('taskPrioUrgent').style.border = 'solid 1px var(--globalInputBorderColor)';
        getElementById('taskPrioMedium').style.border = 'solid 1px var(--globalInputBorderColor)';
        getElementById('taskPrioLow').style.border = 'solid 1px var(--globalInputBorderColor)';
        taskPrioOK = true;
    }
}


/** check taskCategory()
 * check if input taskCategory is filled
 * render message if not
 */
export function checkSelectedCategory() {
    if (taskCategory === '') {
        getElementById('categoryFieldRequired').style.color = 'var(--txt-color-required)';
        getElementById('taskCategory').style.border = 'solid 1px var(--txt-color-required)';
        taskCategoryOK = false;
    } else {
        getElementById('categoryFieldRequired').style.color = 'var(--globalBgColor)';
        taskCategoryOK = true;
    }
}

getElementById('includeSideBar').innerHTML = sideBarTemplate();  // z002 | import { sideBarTemplate } from './templates/sidebar-template.js';
getElementById('includeHeader').innerHTML = headerTemplate();    // z003 | import { headerTemplate } from './templates/header-template.js';
getElementById('userInitials') ? headerInitiale() : '';          // z005 | import { headerInitiale } from './utils/navigation.js';
    
currentPage === '/addTask.html' ? getElementById('mainContent').innerHTML = addTaskTemplate() : getElementById('showAddTaskOverlay').innerHTML = addTaskTemplate();

btnInputAddSubtask();
initAddTask();
removeClass('#container', 'd-none');