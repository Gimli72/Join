// @ts-check

/**
 * @typedef {import('../../../types').User} User
 * @typedef {import('../../../types').Task} Task
 */

/**
 * Template for task header
 * @param {Task} task 
 * @returns 
 */
export const cardHeader = (task) => /*html*/ `
    <div class="card flex flex-col gap-24 done" id="${task.id}">
        <!-- Header -->
        <div class="classHeader ${task.category === 'User Story' ? 'classHeaderBlue' : 'classHeaderGreen'}">${task.category}</div>
        <!-- Title & Description -->
        <div class="flex flex-col gap-8">
            <div class="text-16px text-normal-700">${task.title}</div>
            <div class="text-16px text-normal-400 truncate">${task.description}</div>
        </div>
        <div class="flex gap-11 items-center justify-between pb-2 pr-8" id="cardProgressBar">
            <!-- Progress Bar -->
        </div>
        <div class="cardInitiale flex justify-between w-full">
            <div class="flex ml-15" id="cardContacts"></div>
            <img class="cardInitialePrio" src="./assets/img/medium.svg" alt="">
        </div>
    </div>
`;

/**
 * Template for progress bar
 * @param {Task} task 
 * @param {number} subtaskDone 
 * @param {number} subtaskTotal 
 * @returns 
 */
export const cardProgressBar = (task, subtaskDone, subtaskTotal) => /*html*/ `
    <div class="progressBarContainer relative pb-6">
        <div class="progressBarBg absolute">
            <div class="progressBar absolute" id="progressBar"></div>
        </div>
    </div>
    <div class="cardSubTasks text-12px text-normal-400">${subtaskDone}/${subtaskTotal} Subtasks</div>
`;

/**
 * HTML user
 * @param { User } user
 * @param { string } initiale
 * @returns html code
 */
export const initialeCircleTemplate = (user, initiale, cardInitialeImg = 'cardInitialePrio') => /*html*/ `

    <div class="cardInitialeImg user-overview-user flex items-start gap-35 pointer" id="${user.uid}">
        <div class="user-overview-user-circle relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"
                fill="none">
                <circle cx="21" cy="21" r="20" fill="${user.color}" stroke="white"
                    stroke-width="1" />
            </svg>
            <span class="absolute position-center text-12px text-normal-400 white">${initiale}</span>
        </div>
    </div>

`;

/**
 * Template for task footer
 * @param {Task} task 
 * @returns 
 */
export const cardFooter = (task) => /*html*/ `
    <!-- Footer -->
    <div class="cardInitiale flex justify-between w-full">
        <div class="flex ml-15" id="cardContacts"></div>
        <img class="cardInitialePrio" src="./assets/img/medium.svg" alt="">
    </div>
`;
