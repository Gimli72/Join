// @ts-check

import { initialeCircleTemplate } from '../templates/card-short.js';
import { getElementById } from '../utils/standard.js';
import { useUsers } from '../utils/use-users.js';

/**
 * @typedef {import('../../../types').User} User
 * @typedef {import('../../../types').Task} Task
 * @typedef {import('../../../types').Subtask} Subtask
 */

const { userInitiale } = await useUsers();

/**
 * 
 * @param {Task} task 
 * @returns 
 */
export const editTaskTemplate = (task) => /*html*/ `
    <span id="editTaskOverlay" class="done"></span>
    <div class="flex justify-between pb-32">
        <div class="cardOverlayHeader"></div>
        <img id="cardOverlayHeaderImg" class="cardOverlayHeaderImg" src="./assets/img/close.svg" alt="">
    </div>
    <!-- addTask | title -->
    <div class="taskFormSection">
        <label class="taskFormSectionLabel text-16px text-normal-400 requiredIcon" for="editTaskTitle">Title </label>
        <input id="taskTitle" class="taskInput" type="text" placeholder="Enter a title" value="${task.title}" >
        <div id="titleFieldRequired">This field is required</div>
    </div>
    <!-- addTask | description -->
    <div class="taskFormSection">
        <label class="taskFormSectionLabel" for="taskDescription">Description</label>
        <textarea id="taskDescription" class="taskInput" cols="30" rows="5" type="text" placeholder="Enter a Description" value="${task.description}"></textarea>
    </div>
    <!-- addTask | dueDate -->
    <div class="taskFormSection">
        <label class="taskFormSectionLabel requiredIcon" for="taskDueDate">Due date </label>
        <input id="taskDueDate" class="taskInput placeHolderDate" type="date" min="2024-01-30" max="2025-12-31" value="${task.dueDate}" required>
        <div id="dateFieldRequired">This field is required${task.dueDate}</div>
    </div>
    <!-- addTask | prio* -->
    <div class="taskFormSection">
        <div class="taskFormSectionLabel">Priority</div>
        <div class="prioTaskForm">
            <button type="button" class="prioCategory" id="taskPrioUrgent" data-prio="urgent">
                Urgent
                <img src="assets/img/addTaskImg/urgentIcon.svg" id="urgentIcon">
            </button>
            <button type="button" class="prioCategory" id="taskPrioMedium" data-prio="medium">
                Medium
                <img src="assets/img/addTaskImg/mediumIcon.svg" id="mediumIcon">
            </button>
            <button type="button" class="prioCategory" id="taskPrioLow" data-prio="low">
                Low
                <img src="assets/img/addTaskImg/lowIcon.svg" id="lowIcon">
            </button>
        </div>
        <div id="prioFieldRequired">This field is required</div>    
    </div>
    <!-- Assigned to -->
    <div class="taskFormSection">
    <div id="taskAsignedDropdown" class="taskFormSectionLabel requiredIcon" for="">
        <label for="taskAsignedDropdown">Assigned to</label>
    </div>
    <div id="taskContacts" class="taskInput">
        <!-- <span id="filterContacts">Select contacts to asign</span> -->
        <input id="filterContacts" type="text" name="filter" placeholder="Select contacts to asign">
        <img id="contactsArrow" class="arrow" src="./assets/img/addTaskImg/arrowDown2.svg">
    </div>
    <div id="contactsDropdown" class="contactsDropdown">
    </div>
    <div id="contactFieldRequired">This field is required</div>
    <div id="contactSummary" class="contactSummary"></div>
    </div>
    <!-- addTask | subCategory* -->
    <div class="taskFormSection">
        <div class="taskFormSection">
            <div class="taskFormSectionLabel">Subtasks</div>
            <div id="taskSubtask" class="taskInput" data-enable="enable">
                <!-- <span id="selectedSubtask">Add new subtask</span> -->
                <input id="addSubtask" type="text" name="addSubtask" placeholder="Add new subtasks">
                <img id="subtaskPlus" class="plus" src="./assets/img/addTaskImg/subtaskPlus.svg">
                <div id="addSubtaskEdit" class="addSubtaskEdit d-none">
                    <img id="subtaskCheck" class="check" src="./assets/img/addTaskImg/subtaskCheck.svg">
                    <img id="subtaskSepIcons" class="sepIcons" src="./assets/img/addTaskImg/subtaskSepIcons.svg">
                    <img id="subtaskClose" class="close" src="./assets/img/addTaskImg/subtaskClose.svg">
                </div>    
            </div>
            <div id="subtaskDropdown" class="subtaskDropdown">

            </div>                                    
        </div>
    </div> 
    <!-- OK Button -->
    <div class="flex justify-end pt-80">
        <button
            class="btn btn-secondary text-normal-700 text-21px gap-4 flex justify-center items-center" id="editChangesOk">OK<img src="./assets/img/check.svg"></button>
    </div>
`;

/**
 * 
 * @param {Task} task 
 * @returns 
 */
export const cardOverlayHeader = (task, date) => /*html*/ `
    <div class="flex justify-between mb-24">
            <div class="classHeader headerTagOverlay ${task.category === 'User Story' ? 'classHeaderBlue' : 'classHeaderGreen'}">${task.category}</div>
            <img id="cardOverlayHeaderImg" class="crossClose pointer" src="./assets/img/close.svg" alt="">
    </div>
    <div class="text-61px text-normal-700 mb-24">${task.title}</div>
    <div class="text-20px text-normal-400 mb-24">${task.description}</div>
    <div class="flex gap-25 text-20px text-normal-400 mb-24 justify-between">
        <span>Due date:</span>
        <span>${date}</span>
    </div>
    <div class="flex items-center text-20px text-normal-400 gap-25 mb-24 justify-between">
        <span>Priority:</span>
        <div class="cardOverlayPrio flex gap-16 item-center">
            <span>${task.prio.charAt(0).toUpperCase() + task.prio.slice(1)}</span>
            <img class="cardInitialePrio" src="./assets/img/${task.prio}.svg" alt="">
        </div>
    </div>
    <div class="flex flex-col text-20px text-normal-400 gap-8  mb-24">
        <div>Assigned To:</div>
        <div class="flex flex-col gap-4" id="cardOverlayContacts">
            <!-- Listing of all contacts -->
        </div>
    </div>
    <div class="flex flex-col text-16px text-normal-400 gap-8  mb-24">
        <div>Subtasks</div>
        <div class="flex flex-col gap-4"  id="cardOverlaySubtasks">
            <!-- Auflistung aller Subtasks -->
        </div>
    </div>
    <div class="flex gap-8 justify-end">
        <div id="deleteTask" class="flex gap-8 justify-center items-center pointer cardOverlayDelete">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path class="cardOverlayDeleteIcon"
                    d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                    fill="#2A3647" />
            </svg>
            <span class="cardOverlayDeleteText">Delete</span>
        </div>
        <img src="./assets/img/hyphen.svg" alt="">
        <div id="editTask" class="flex gap-8 justify-center items-center pointer cardOverlayDelete">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path class="cardOverlayDeleteIcon"
                    d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                    fill="#2A3647" />
            </svg>
            <span class="cardOverlayDeleteText">Edit</span>
        </div>
    </div>
`;

/**
 * 
 * @param {Subtask} subtask 
 * @returns 
 */
export const cardOverlaySubtaskTemplate = (subtask) => /*html*/ `
    <div id="${subtask.id}" class="flex items-center gap-16 pointer cardOverlaySubtasks">
        <img id="${subtask.id}.img" src="./assets/img/check${subtask.status ? true : false}.png" alt="">
            <div>${subtask.title}</div>
    </div>
`;

/**
 * Toggles the status of a subtask and updates an associated image accordingly.
 * 
 * @param {Subtask} subtask An object representing the subtask, with at least `id` and `status` properties.
 */
export function toggleSubtask(subtask) {
    // Assuming `subtask.id` uniquely identifies the element for the subtask, and 
    // `subtask.id + '.img'` is the ID for the image associated with this subtask.
    const subtaskElement = getElementById(subtask.id);
    if (!subtaskElement) {
        console.error('Subtask element not found:', subtask.id);
        return;
    }
    subtaskElement.addEventListener('click', () => {
        // Toggle the subtask's status
        subtask.status = !subtask.status;
        console.log('Toggled subtask status to:', subtask.status);
        // Get the image element associated with this subtask
        const imageElement = getElementById(subtask.id + '.img');
        if (!imageElement) {
            console.error('Image element not found for subtask:', subtask.id + '.img');
            return;
        }
        // Update the image based on the new status
        if (subtask.status) {
            // @ts-ignore
            imageElement.src = "./assets/img/checktrue.png"; // Path to the image when subtask is completed/checked
        } else {
            // @ts-ignore
            imageElement.src = './assets/img/checkfalse.png'; // Path to the image when subtask is not completed/unchecked
        }
        console.log('Updated image for:', subtask.id);
    });
}

/**
 * 
 * @param {User} user 
 * @returns 
 */
export const cardOverlayContactTemplate = (user) => /*html*/ `
    <div class="flex items-center gap-16 cardOverlayContacts ml-24 mb-8">
        ${initialeCircleTemplate(user, userInitiale(user.name))}
        <div>${user?.name}</div>
    </div>
`;