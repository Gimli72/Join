'use strict';
import { getElementById, getInputElementById } from './utils/standard.js';
import { addClass, removeClass } from './utils/class.js';
import { uuid } from './utils/crypto.js';
import { closeCategoryDropdown, closeContactsDropdown } from '../script/addTask.js';


export let addedSubtasks = [];


export const btnInputAddSubtask = (edit = false) => {
    getElementById('taskSubtask').addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (target instanceof Element) {
            target.closest('#addSubtask') ? setStyleInputAddSubtask(edit) : '';
            target.closest('#taskSubtask') ? setStyleInputAddSubtask(edit) : '';
            target.closest('#subtaskClose') ? resetStyleInputAddSubtask() : '';
            target.closest('#subtaskCheck') ? logInSubtask() : '';
        };
    });
    getElementById('addSubtask').addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            logInSubtask();
        }
    });     
}


/** setStyleEditSubtaskControl(i)
 * show subTask control icons when hover shown subtasks
 * @param {*} i 
 */
function setStyleEditSubtaskControl(i) {  
    getElementById('ddiSubtask_' + i).addEventListener("mouseover", (event) => {
        removeClass('#ddiSubtaskControl_' + i , 'd-none');
    });
    getElementById('ddiSubtask_' + i).addEventListener("mouseout", (event) => {
        addClass('#ddiSubtaskControl_' + i , 'd-none');
    });
}


export function btnEditAddSubtask(i) {
    getElementById('ddiSubtask_' + i).addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (target instanceof Element) {
            target.closest('#subtaskDelete_' + i) ? subtaskDelete(i) : '';
            target.closest('#subtaskEdit_' + i) ? subtaskEdit(i) : '';
        };
    });
};


/** subtaskDelete(i)
 * deletes a rendered subtask when click delete-icon which shows on hover
 * @param {*} id 
 */
function subtaskDelete(id) {
    addedSubtasks = addedSubtasks.filter((subtask) => subtask.id !== id);
    renderSubtaskDropdown();
};


/** subtaskEdit(i)
 * edit a rendered subtask when click edit-icon which shows on hover
 * @param {*} i 
 */
function subtaskEdit(i) {
    renderSubtaskDropdown();
};


export function setStyleInputAddSubtask(edit = false) {
    addClass('#subtaskPlus', 'd-none');
    removeClass('#addSubtaskEdit', 'd-none'); 
    getElementById('taskSubtask').style.border = 'solid 1px var(--globalColorSecond)'; 
    getElementById('taskSubtask').dataset.enable = "disable";
    !edit ? closeCategoryDropdown() : '';
    closeContactsDropdown();
};


export function resetStyleInputAddSubtask() {
    addClass('#addSubtaskEdit', 'd-none');
    removeClass('#subtaskPlus', 'd-none');
    getElementById('taskSubtask').style.border = 'solid 1px var(--Style, #D1D1D1)'; 
    getElementById('taskSubtask').dataset.enable = "enable";
};


export function logInSubtask() {
    if (getInputElementById('addSubtask').value === '') {
        resetStyleInputAddSubtask();
    } else {
        let newSubtask = {
            id : uuid(),
            title: getInputElementById('addSubtask').value,
            status : false
        }
        addedSubtasks.push(newSubtask);
        renderSubtaskDropdown();
        getInputElementById('addSubtask').value = '';
        resetStyleInputAddSubtask();
    }
};


export function renderSubtaskDropdown() {
    getElementById('subtaskDropdown').style.visibility = 'visible';
    let dropdownField = '';
    for (let i = 0; i < addedSubtasks.length; i++) {
        dropdownField += /* html */ `
            <div id="ddiSubtask_${addedSubtasks[i].id}" class="ddiSubtask">
                <div>&bull; ${addedSubtasks[i].title}</div>
                <div id="ddiSubtaskControl_${addedSubtasks[i].id}" class="ddiSubtaskControl d-none">
                <img id="subtaskEdit_${addedSubtasks[i].id}" class="edit" src="./assets/img/addTaskImg/subtaskEdit.svg">
                <img id="subtaskSepIcons_${addedSubtasks[i].id}" class="sepIconsControl" src="./assets/img/addTaskImg/subtaskSepIconsControl.svg">
                <img id="subtaskDelete_${addedSubtasks[i].id}" class="delete" src="./assets/img/addTaskImg/subtaskDelete.svg">
                </div>
            </div>    
            `;
    };
    getElementById('subtaskDropdown').innerHTML = dropdownField;
    for (let i = 0; i < addedSubtasks.length; i++) {
        setStyleEditSubtaskControl(addedSubtasks[i].id);
        btnEditAddSubtask(addedSubtasks[i].id);
    };
};


/** clearAddTaskSubtask() | reset subtask input-field */
export function clearAddTaskSubtask() {
    addedSubtasks = [];
    renderSubtaskDropdown();
}


/* ----------------------------------------------------- */
/* - import eventInputAddSubtask from "./addSubTask.js"; */
/* ----------------------------------------------------- */

// z535..
/** styleInputSubtaskDropdown() | style and reconfigure inputfield subtask */
export function styleInputSubtaskDropdown() {
    getElementById('subtaskArrow').style.transform = 'rotate(180deg)';
    getElementById('taskSubtask').style.border = 'solid 1px var(--globalColorSecond)';
    closeContactsDropdown();
    closeCategoryDropdown();
    getElementById('taskSubtask').removeEventListener("click", renderSubtaskDropdown);
    getElementById('taskSubtask').addEventListener("click", closeSubtaskDropdown);
}


/** closeSubtaskDropdown() | close subtask input-field */
export function closeSubtaskDropdown() {
    getElementById("subtaskDropdown").innerHTML = '';
    getElementById('taskSubtask').style.border = 'solid 1px var(--globalInputBorderColor)';
    getElementById('subtaskArrow').style.transform = 'rotate(0deg)';
    getElementById('taskSubtask').removeEventListener("click", closeSubtaskDropdown);
    getElementById('taskSubtask').addEventListener("click", renderSubtaskDropdown);
}
