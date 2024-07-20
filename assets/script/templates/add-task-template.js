/**
 * Template for add task page
 * @returns 
 */
export const addTaskTemplate = () => /*html*/ `
<div class="content">
    <!-- addTask | taskHeader | Label -->
    <header class="taskHeader">
        <span class="label">Add Task</span>
        <img id="closeShowAddTaskOverlay" class="crossClose d-none" src="./assets/img/addTaskImg/crossClose.svg" alt="">
    </header>
    <!-- addTask | formular -->
    <div id="taskform" class="taskForm">
            <!-- addTask | left part formular -->
        <div class="subTaskForm">
            <!-- addTask | title -->
            <div class="taskFormSection">
                <label class="taskFormSectionLabel requiredIcon" for="taskTitle">Title</label>
                <input id="taskTitle" class="taskInput" type="text" placeholder="Enter a title">
                <div id="titleFieldRequired">This field is required</div>
            </div>
            <!-- addTask | description -->
            <div class="taskFormSection">
                <label class="taskFormSectionLabel" for="taskDescription">Description</label>
                <textarea id="taskDescription" class="taskInput" cols="30" rows="10" type="text" placeholder="Enter a Description"></textarea>
            </div>
            <!-- addTask | assignedTo -->
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
        </div>
        <!-- addTask | middle part formular -->
        <div class="formSeparator"></div>
        <!-- addTask | right part formular -->
        <div class="subTaskForm">
            <!-- addTask | dueDate -->
            <div class="taskFormSection">
                <label class="taskFormSectionLabel requiredIcon" for="taskDueDate">Due date</label>
                <input id="taskDueDate" class="taskInput placeHolderDate" type="date" required>
                <div id="dateFieldRequired">This field is required</div>

            </div>
            <!-- addTask | prio* -->
            <div class="taskFormSection">
                <div class="taskFormSectionLabel requiredIcon">Prio</div>
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
            <!-- addTask | category* -->
            <div class="taskFormSection">
                <div class="taskFormSection">
                    <div class="taskFormSectionLabel requiredIcon">Category</div>
                    <div id="taskCategory" class="taskInput">
                            <span id="selectedCategory">Select a task category</span>
                        <img id="categoryArrow" class="arrow" src="./assets/img/addTaskImg/arrowDown2.svg">
                    </div>
                    <div id="categoryDropdown" class="categoryDropdown">
                    </div>
                    <div id="categoryFieldRequired">This field is required</div>
                </div>
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
        </div>
    </div>
    <!-- addTask | taskFooter -->
    <footer class="taskFooter">
        <p class="taskFooterText requiredIconBefore">This field is required</p>
        <div class="taskFooterButtons">
            <button id="clearAddTask" class="btn-primary-white"> Clear</button>
            <button id="createAddTask" class="btn-primary-dark">Create Task</button>
        </div>
    </footer>

    <div id="taskAddMessage" class="taskAddMessage d-none">
        <span>Task added to board</span>
        <img src="assets/img/addTaskImg/boardIcon.svg" alt="">
    </div>
</div>
`;