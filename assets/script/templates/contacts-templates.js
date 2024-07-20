// @ts-check

/**
 * @typedef {import('../../../types').User} User
 */

/**
 * Template for the contacts page
 * @returns html code
 */
export const contactsTemplate = () => /*html*/ `
    <!-- Menü Add new contact-->
    <div class="add-new-contact-mobil" id="addNewContactMobil">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M25.3291 18.6667C25.0132 18.6667 24.7497 18.5602 24.5386 18.3473C24.3275 18.1343 24.2219 17.8704 24.2219 17.5556V14.4445H21.1108C20.796 14.4445 20.5321 14.3376 20.3191 14.1239C20.1062 13.9102 19.9997 13.6454 19.9997 13.3295C19.9997 13.0136 20.1062 12.7501 20.3191 12.5389C20.5321 12.3278 20.796 12.2223 21.1108 12.2223H24.2219V9.11115C24.2219 8.79635 24.3288 8.53246 24.5425 8.31948C24.7562 8.10653 25.021 8.00005 25.3369 8.00005C25.6528 8.00005 25.9163 8.10653 26.1274 8.31948C26.3386 8.53246 26.4441 8.79635 26.4441 9.11115V12.2223H29.5552C29.87 12.2223 30.1339 12.3291 30.3469 12.5428C30.5599 12.7566 30.6663 13.0214 30.6663 13.3373C30.6663 13.6532 30.5599 13.9167 30.3469 14.1278C30.1339 14.3389 29.87 14.4445 29.5552 14.4445H26.4441V17.5556C26.4441 17.8704 26.3373 18.1343 26.1235 18.3473C25.9098 18.5602 25.645 18.6667 25.3291 18.6667ZM11.9997 15.9778C10.533 15.9778 9.31449 15.4926 8.34411 14.5223C7.37375 13.5519 6.88858 12.3334 6.88858 10.8667C6.88858 9.40005 7.37375 8.18154 8.34411 7.21118C9.31449 6.2408 10.533 5.75562 11.9997 5.75562C13.4663 5.75562 14.6849 6.2408 15.6552 7.21118C16.6256 8.18154 17.1108 9.40005 17.1108 10.8667C17.1108 12.3334 16.6256 13.5519 15.6552 14.5223C14.6849 15.4926 13.4663 15.9778 11.9997 15.9778ZM2.44411 26.6667C2.12931 26.6667 1.86542 26.5602 1.65244 26.3473C1.43949 26.1343 1.33301 25.8704 1.33301 25.5556V23.3334C1.33301 22.563 1.53115 21.8612 1.92744 21.2279C2.32375 20.5945 2.86635 20.1186 3.55524 19.8C5.12562 19.0815 6.57998 18.5649 7.91831 18.25C9.25666 17.9352 10.6159 17.7779 11.9961 17.7779C13.3763 17.7779 14.7367 17.9352 16.0774 18.25C17.4182 18.5649 18.8663 19.0815 20.4219 19.8C21.1108 20.1334 21.6571 20.613 22.0608 21.2389C22.4645 21.8649 22.6663 22.563 22.6663 23.3334V25.5556C22.6663 25.8704 22.5599 26.1343 22.3469 26.3473C22.1339 26.5602 21.87 26.6667 21.5552 26.6667H2.44411ZM3.55521 24.4445H20.4441V23.3334C20.4441 23.0149 20.3645 22.7149 20.2052 22.4334C20.046 22.1519 19.8071 21.9408 19.4886 21.8C18.0515 21.0963 16.7626 20.6204 15.6219 20.3723C14.4812 20.1241 13.2737 20 11.9997 20C10.7256 20 9.5182 20.1278 8.37744 20.3834C7.23671 20.6389 5.94042 21.1112 4.48857 21.8C4.19966 21.9408 3.97187 22.1519 3.80521 22.4334C3.63854 22.7149 3.55521 23.0149 3.55521 23.3334V24.4445ZM11.9997 13.7556C12.8219 13.7556 13.5089 13.4797 14.0608 12.9278C14.6126 12.376 14.8886 11.6889 14.8886 10.8667C14.8886 10.0445 14.6126 9.35746 14.0608 8.80562C13.5089 8.25375 12.8219 7.97782 11.9997 7.97782C11.1775 7.97782 10.4904 8.25375 9.93857 8.80562C9.38671 9.35746 9.11077 10.0445 9.11077 10.8667C9.11077 11.6889 9.38671 12.376 9.93857 12.9278C10.4904 13.4797 11.1775 13.7556 11.9997 13.7556Z" fill="white"/>
        </svg>
    </div>
    <div class="user-overview max-h-full justify-center flex relative">
        <div class="absolute btn-add-new-contact">
        <button class="btn btn-contact text-normal-700 text-21px gap-16 flex justify-center items-center"
            id="openAddContact">Add new contact<img class="btn-contact-img" src="./assets/img/person_add.svg"></button>
        </div>
        <!-- Contact Overview -->
        <div class="add-new-contact" id="contactOverview">
        </div>
    </div>
    <div class="board-label relative" id="boardLabel">
        <div class="flex items-center gap-30">
            <span class="text-normal-700 text-61px">Contacts</span>
            <img src="./assets/img/summaryImg/labelSeparator.svg" alt="">
            <span class="text-27px text-normal-400 global-color-prime w-max">Better with a team</span>
        </div>
        <!-- Floating contact -->
        <div class="user-details flex-col items-start gap-21" id="userDetails">
            <div class="flex items-center gap-54">
                <div class="user-overview-user-circle-big relative">
                    <!-- SVG Großer farbiger Kreis -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"
                        fill="none">
                        <circle class="circleBig" cx="60" cy="60" r="60" fill="#FF7A00" stroke="white"
                            stroke-width="2" />
                    </svg>
                    <span class="absolute position-center  text-47px text-normal-400 white">AM</span>
                </div>
                <div class="flex flex-col items-start gap-8">
                    <div class="text-47px text-normal-500">Anton Mayer</div>
                    <div class="text-horizontal gap-16">
                        <div class="text-horizontal gap-8 pointer edit" id="openEditContacts">
                            <!-- SVG Edit Icon -->
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g class="edit">
                                    <path
                                        d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                        fill="#2A3647" />
                                </g>
                            </svg>
                            <span class="text-16px text-normal-400 global-color-prime edit">Edit</span>
                        </div>
                        <div class="text-horizontal gap-8 pointer delete" id="deleteCon">
                            <!-- SVG Delete Icon -->
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g class="delete">
                                    <path
                                        d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                                        fill="#2A3647" />
                                </g>
                            </svg>
                            <span class="text-16px text-normal-400 global-color-prime delete">Delete</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-details-information flex flex-col justify-center">
                <span class=" text-20px text-normal-400">Contact Information</span>
            </div>
            <div class="flex flex-col gap-15 items-start">
                <div>
                    <div class="text-16px text-normal-700">Email</div>
                    <div class="global-color-second text-16px text-normal-400">anton&commat;gmail.com</div>
                </div>
                <div>
                    <div class="text-16px text-normal-700">Phone</div>
                    <div class="text-16px text-normal-400">+49 1111 111 11 1</div>
                </div>
            </div>
        </div>
    </div>
    <div class="user-details-mobil" id="userDetailsMobil"></div>
    <div class="overlay-mobil done" id="overlayMobil"></div> 
`;


/**
 * HTML for current initiale
 * @param {string} currentInitiale
 * @returns html code
 */
export const currentInitialeTemplate = (currentInitiale) => /*html*/ `
    <div class="user-overview-letter flex flex-col justify-center items-start gap-8">${currentInitiale}</div>
`;

/**
 * HTML separator
 * @returns html code
 */
export const separatorTemplate = () => /*html*/ `
    <div class="user-overview-separator flex flex-col items-start gap-10">
        <img src="./assets/img/separator.svg">
    </div>
`;


/**
 * HTML user
 * @param { User } user
 * @param { string } initiale
 * @returns html code
 */
export const userTemplate = (user, initiale) => /*html*/ `
<div class="user-overview-user flex items-start gap-35 pointer" id="${user.uid}">
    <div class="user-overview-user-circle relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"
            fill="none">
            <circle cx="21" cy="21" r="20" fill="${user.color}" stroke="white"
                stroke-width="2" />
        </svg>
        <span class="absolute position-center text-12px text-normal-400 white">${initiale}</span>
    </div>
    <div class="flex flex-col items-start gap-5 pointer">
        <span class="text-20px text-normal-400 user-overview-limitation">
            ${user.name}
        </span>
        <span class="text-16px email-link user-overview-limitation">
            ${user.email}
        </span>
    </div>
</div>
`;

/**
 * Template for user details
 * @param {User} user 
 * @param {string} initiale 
 * @returns html code
 */
export const showUserDetailsTemplate = (user, initiale) => /*html*/ `
    <div class="flex items-center gap-54" >
        <div class="user-overview-user-circle-big relative">
            <!-- SVG Großer farbiger Kreis -->
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"
                fill="none">
                <circle class="circleBig" cx="60" cy="60" r="60" fill="${user.color}" stroke="white"
                    stroke-width="2" />
            </svg>
            <span class="absolute position-center  text-47px text-normal-400 white">${initiale}</span>
        </div>
        <div class="flex flex-col items-start gap-8" id="userId" data-userUid="${user.uid}">
            <div class="text-47px text-normal-500 user-details-name">${user.name}</div>
            <div class="text-horizontal gap-16">
                <div class="text-horizontal gap-8 pointer edit" id="openEditContacts">
                    <!-- SVG Edit Icon -->
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g class="edit">
                            <path
                                d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                fill="#2A3647" />
                        </g>
                    </svg>
                    <span class="text-16px text-normal-400 global-color-prime edit">Edit</span>
                </div>
                <div class="text-horizontal gap-8 pointer delete" id="deleteContact">
                    <!-- SVG Delete Icon -->
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g class="delete">
                            <path
                                d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                                fill="#2A3647" />
                        </g>
                    </svg>
                    <span class="text-16px text-normal-400 global-color-prime delete">Delete</span>
                </div>
            </div>
        </div>
    </div>
    <div class="user-details-information flex flex-col justify-center">
        <span class=" text-20px text-normal-400">Contact Information</span>
    </div>
    <div class="flex flex-col gap-15 items-start">
        <div>
            <div class="text-16px text-normal-700">Email</div>
            <div class="global-color-second text-16px text-normal-400">${user.email}</div>
        </div>
        <div>
            <div class="text-16px text-normal-700">Phone</div>
            <div class="text-16px text-normal-400">${user.phone}</div>
        </div>
    </div>
`;

/**
 * Template for edit contacts
 * @param {User} user 
 * @param {string} initiale 
 * @returns html code
 */
export const editContactsTemplate = (user, initiale) => /*html*/ `
    <div class="overlay-contact-left flex flex-col justify-center items-center">
        <div class="overlay-edit-contact flex flex-col justify-center gap-16">
            <img class="logo-small" src="./assets/img/logo_54x66.png" alt="">
            <div class="gap-8">
                <p class="text-normal-700 text-61px white m-0">Edit contact</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="94" height="3" viewBox="0 0 94 3" fill="none">
                <path d="M92 1.5L2 1.5" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
            </svg>
        </div>
    </div>
    <div class="overlay-contact-right relative w-full">
        <div class="overlay-close absolute pointer" id="closeEditContacts">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_130689_666" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                    width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_130689_666)">
                    <path
                        d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                        fill="#2A3647" />
                </g>
            </svg>
        </div>
        <div class="flex items-center gap-72 overlay-contact-right-form absolute">
            <div class="user-overview-user-circle-big relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"
                    fill="none">
                    <circle cx="60" cy="60" r="60" fill="${user.color}" stroke="white"
                        stroke-width="2" />
                </svg>
                <span class="absolute position-center  text-47px text-normal-400 white">${initiale}</span>
            </div>
            <form id="create-contact-form" class="content-form flex gap-32" id="userId" data-userUid="${user.uid}">
                <div class="form-input">
                    <input id="editName" type="name" autocomplete="name" placeholder="Enter your name" value="${user.name}"
                        class="form-input-text text-20px text-normal-400 black">
                    <img src="./assets/img/person.svg" alt="" class="form-input-img">
                </div>
                <div class="form-input">
                    <input id="editEmail" type="email" autocomplete="email" placeholder="Enter your email" value="${user.email}"
                        class="form-input-text text-20px text-normal-400 black">
                    <img src="./assets/img/mail.svg" alt="" class="form-input-img">
                </div>
                <div class="form-input">
                    <input id="editTel" type="tel" autocomplete="tel" placeholder="Enter your phone number" value="${user.phone}"
                        class="form-input-text text-20px text-normal-400 black">
                    <img src="./assets/img/call.svg" alt="" class="form-input-img">
                </div>
                <div class="flex gap-24">
                    <button
                        class="btn btn-text-img-white text-normal-400 text-20px gap-4 flex justify-center items-center" id="deleteEditContact">Delete</button>
                    <button
                        class="btn btn-primary-dark text-normal-700 text-21px gap-4 flex justify-center items-center" id="saveContact">Save<img
                            src="./assets/img/check.svg"></button>
                </div>
            </form>
        </div>
    </div>
`;

/**
 * Template for add new contact
 * @returns 
 */
export const addContactTemplate = () => /*html*/ `
    <div class="overlay-contact-left flex flex-col justify-center items-center">
        <div class="overlay-edit-contact flex flex-col justify-center gap-16">
            <img class="logo-small" src="./assets/img/logo_54x66.png" alt="">
            <div class="gap-8">
                <p class="text-normal-700 text-61px white m-0">Add contact</p>
                <p class="text-normal-400 text-27px white m-0">Tasks are better with a team!</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="94" height="3" viewBox="0 0 94 3" fill="none">
                <path d="M92 1.5L2 1.5" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
            </svg>
        </div>
    </div>
    <div class="overlay-contact-right relative w-full">
        <div class="overlay-close absolute pointer" id="closeAddContacts">
            <img class="overlay-close-img" src="./assets/img/close.svg" alt="">
        </div>
        <div class="flex items-center gap-72 overlay-contact-right-form absolute">
            <div class="user-overview-user-circle-big relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"
                    fill="none">
                    <circle cx="60" cy="60" r="60" fill="#D1D1D1" stroke="white" stroke-width="2" />
                </svg>
                <img src="./assets/img/person_white.svg" alt=""
                    class="form-input-img-big absolute position-center">
            </div>
            <form id="create-contact-form" class="content-form flex gap-32">
                <div class="form-input">
                    <input id="name" type="name" autocomplete="name" placeholder="Name"
                        class="form-input-text text-20px text-normal-400 black">
                    <img src="./assets/img/person.svg" alt="" class="form-input-img">
                </div>
                <div class="form-input">
                    <input id="email" type="email" autocomplete="email" placeholder="Email"
                        class="form-input-text text-20px text-normal-400 black">
                    <img src="./assets/img/mail.svg" alt="" class="form-input-img">
                </div>
                <div class="form-input">
                    <input id="tel" type="tel" autocomplete="tel" placeholder="Phone"
                        class="form-input-text text-20px text-normal-400 black">
                    <img src="./assets/img/call.svg" alt="" class="form-input-img">
                </div>
                <div class="flex gap-24">
                    <button
                        class="btn btn-text-img-white text-normal-400 text-20px gap-4 flex justify-center items-center" id="cancelAddContact">Cancel<svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25"
                            fill="none" class="svg-cancel">
                            <path
                                d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                                stroke="#2A3647" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg></button>
                    <button
                        class="btn btn-primary-dark-disabled text-normal-700 text-21px gap-4 flex justify-center items-center" disabled="true" id="createContact">Create
                        contact<img src="./assets/img/check.svg"></button>
                </div>
            </form>
        </div>
    </div>
`;

// From here mobile version

/**
 * Template for edit contact mobile
 * @param {User} user 
 * @param {string} initiale 
 * @returns html code
 */
export const editContactsMobileTemplate = (user, initiale) => /*html*/ `
    <!-- Edit Contact -->
    <div class="overlay-mobil-top">
        <div class="overlay-mobil-exit" id="overlayEditContactsMobileExit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_133807_3949" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_133807_3949)">
                    <path d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z" fill="white"/>
                </g>
            </svg>
        </div>
        <div class="overlay-edit-contact flex flex-col justify-center gap-16 pl-24">
            <div class="gap-8">
                <p class="text-normal-700 text-47px white m-0">Edit contact</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="94" height="3" viewBox="0 0 94 3" fill="none">
                <path d="M92 1.5L2 1.5" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
            </svg>
        </div>
    </div>
    <div class="overlay-mobil-bottom flex flex-col items-center gap-32">
        <div class="user-overview-user-circle-big-mobil relative flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="126" height="126" viewBox="0 0 126 126" fill="none">
                <circle cx="63" cy="63" r="60" fill="${user.color}" stroke="white" stroke-width="3" />
            </svg>
            <span class="absolute position-center text-47px text-normal-400 white">${initiale}</span>
        </div>
        <form id="create-contact-form" class="content-form flex gap-24" id="userId" data-userUid="${user.uid}">
            <div class="form-input">
                <input id="editName" type="name" autocomplete="name" placeholder="Enter your name" value="${user.name}"
                    class="form-input-text text-20px text-normal-400 black">
                <img src="./assets/img/person.svg" alt="" class="form-input-img">
            </div>
            <div class="form-input">
                <input id="editEmail" type="email" autocomplete="email" placeholder="Enter your email" value="${user.email}"
                    class="form-input-text text-20px text-normal-400 black">
                <img src="./assets/img/mail.svg" alt="" class="form-input-img">
            </div>
            <div class="form-input">
                <input id="editTel" type="tel" autocomplete="tel" placeholder="Enter your phone number" value="${user.phone}"
                    class="form-input-text text-20px text-normal-400 black">
                <img src="./assets/img/call.svg" alt="" class="form-input-img">
            </div>
            <div class="flex gap-20">
                <button
                    class="btn btn-text-img-white text-normal-400 text-20px gap-4 flex justify-center items-center" id="deleteEditContact">Delete</button>
                <button
                    class="btn btn-primary-dark text-normal-700 text-21px gap-4 flex justify-center items-center" id="saveContact">Save<img
                        src="./assets/img/check.svg"></button>
            </div>
        </form>
    </div>
`;

/**
 * Template for add new contact mobile
 * @returns 
 */
export const addContactMobileTemplate = () => /*html*/ `
    <!-- Add Contact -->
    <div class="overlay-mobil-top">
        <div class="overlay-mobil-exit" id="overlayMobilExit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_133807_3949" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_133807_3949)">
                    <path d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z" fill="white"/>
                </g>
            </svg>
        </div>
        <div class="overlay-edit-contact flex flex-col justify-center gap-16 pl-24">
            <div class="gap-8">
                <p class="text-normal-700 text-47px white m-0">Add contact</p>
                <p class="text-normal-400 text-20px white m-0">Tasks are better with a team!</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="94" height="3" viewBox="0 0 94 3" fill="none">
                <path d="M92 1.5L2 1.5" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
            </svg>
        </div>
    </div>
    <div class="overlay-mobil-bottom flex flex-col items-center gap-32">
        <div class="user-overview-user-circle-big-mobil relative flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="126" height="126" viewBox="0 0 126 126" fill="none">
                <circle cx="63" cy="63" r="60" fill="#D1D1D1" stroke="white" stroke-width="3" />
            </svg>
            <div class="absolute position-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <mask id="mask0_71395_17935" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
                        <rect width="64" height="64" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_71395_17935)">
                        <path d="M31.9993 31.9998C29.066 31.9998 26.5549 30.9554 24.466 28.8665C22.3771 26.7776 21.3327 24.2665 21.3327 21.3332C21.3327 18.3998 22.3771 15.8887 24.466 13.7998C26.5549 11.7109 29.066 10.6665 31.9993 10.6665C34.9327 10.6665 37.4438 11.7109 39.5327 13.7998C41.6216 15.8887 42.666 18.3998 42.666 21.3332C42.666 24.2665 41.6216 26.7776 39.5327 28.8665C37.4438 30.9554 34.9327 31.9998 31.9993 31.9998ZM47.9994 53.3332H15.9993C14.5327 53.3332 13.2771 52.811 12.2327 51.7665C11.1882 50.7221 10.666 49.4665 10.666 47.9998V45.8665C10.666 44.3554 11.0549 42.9665 11.8327 41.6998C12.6105 40.4332 13.6438 39.4665 14.9327 38.7998C17.6882 37.4221 20.4882 36.3887 23.3327 35.6998C26.1771 35.0109 29.066 34.6665 31.9993 34.6665C34.9327 34.6665 37.8216 35.0109 40.666 35.6998C43.5105 36.3887 46.3105 37.4221 49.066 38.7998C50.3549 39.4665 51.3882 40.4332 52.166 41.6998C52.9438 42.9665 53.3327 44.3554 53.3327 45.8665V47.9998C53.3327 49.4665 52.8105 50.7221 51.766 51.7665C50.7216 52.811 49.466 53.3332 47.9994 53.3332ZM15.9993 47.9998H47.9994V45.8665C47.9994 45.3776 47.8771 44.9332 47.6327 44.5332C47.3882 44.1332 47.066 43.8221 46.666 43.5998C44.266 42.3998 41.8438 41.4998 39.3994 40.8998C36.9549 40.2998 34.4882 39.9998 31.9993 39.9998C29.5105 39.9998 27.0438 40.2998 24.5993 40.8998C22.1549 41.4998 19.7327 42.3998 17.3327 43.5998C16.9327 43.8221 16.6105 44.1332 16.366 44.5332C16.1216 44.9332 15.9993 45.3776 15.9993 45.8665V47.9998ZM31.9993 26.6665C33.466 26.6665 34.7216 26.1443 35.766 25.0998C36.8105 24.0554 37.3327 22.7998 37.3327 21.3332C37.3327 19.8665 36.8105 18.6109 35.766 17.5665C34.7216 16.5221 33.466 15.9998 31.9993 15.9998C30.5327 15.9998 29.2771 16.5221 28.2327 17.5665C27.1882 18.6109 26.666 19.8665 26.666 21.3332C26.666 22.7998 27.1882 24.0554 28.2327 25.0998C29.2771 26.1443 30.5327 26.6665 31.9993 26.6665Z" fill="white"/>
                    </g>
                </svg>
            </div>
        </div>
        <form id="create-contact-form" class="content-form flex gap-15" id="userId" data-userUid="§§§§">
            <div class="form-input">
                <input id="name" type="name" autocomplete="name" placeholder="Name" value=""
                    class="form-input-text text-20px text-normal-400 black">
                <img src="./assets/img/person.svg" alt="" class="form-input-img">
            </div>
            <div class="form-input">
                <input id="email" type="email" autocomplete="email" placeholder="Email" value=""
                    class="form-input-text text-20px text-normal-400 black">
                <img src="./assets/img/mail.svg" alt="" class="form-input-img">
            </div>
            <div class="form-input mb-24">
                <input id="tel" type="tel" autocomplete="tel" placeholder="Phone" value=""
                    class="form-input-text text-20px text-normal-400 black">
                <img src="./assets/img/call.svg" alt="" class="form-input-img">
            </div>
            <div class="flex">
                <button
                    class="btn btn-primary-dark-disabled text-normal-700 text-21px gap-4 flex justify-center items-center" disabled="true" id="createContact">Create
                    contact<img src="./assets/img/check.svg"></button>
            </div>
        </form>
    </div>
`;


/**
 * Template for user details mobile
 * @param {User} user 
 * @param {string} initiale 
 * @returns 
 */
export const userDetailsMobilTemplate = (user, initiale) => /*html*/ `
    <!-- Menü -->
    <div class="user-details-mobil-menu" id="userDetailsMobilMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <mask id="mask0_133807_1644" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                <rect width="32" height="32" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_133807_1644)">
                <path d="M15.9997 26.6666C15.2663 26.6666 14.6386 26.4055 14.1163 25.8833C13.5941 25.361 13.333 24.7333 13.333 23.9999C13.333 23.2666 13.5941 22.6388 14.1163 22.1166C14.6386 21.5944 15.2663 21.3333 15.9997 21.3333C16.733 21.3333 17.3608 21.5944 17.883 22.1166C18.4052 22.6388 18.6663 23.2666 18.6663 23.9999C18.6663 24.7333 18.4052 25.361 17.883 25.8833C17.3608 26.4055 16.733 26.6666 15.9997 26.6666ZM15.9997 18.6666C15.2663 18.6666 14.6386 18.4055 14.1163 17.8833C13.5941 17.361 13.333 16.7333 13.333 15.9999C13.333 15.2666 13.5941 14.6388 14.1163 14.1166C14.6386 13.5944 15.2663 13.3333 15.9997 13.3333C16.733 13.3333 17.3608 13.5944 17.883 14.1166C18.4052 14.6388 18.6663 15.2666 18.6663 15.9999C18.6663 16.7333 18.4052 17.361 17.883 17.8833C17.3608 18.4055 16.733 18.6666 15.9997 18.6666ZM15.9997 10.6666C15.2663 10.6666 14.6386 10.4055 14.1163 9.88325C13.5941 9.36103 13.333 8.73325 13.333 7.99992C13.333 7.26659 13.5941 6.63881 14.1163 6.11659C14.6386 5.59436 15.2663 5.33325 15.9997 5.33325C16.733 5.33325 17.3608 5.59436 17.883 6.11659C18.4052 6.63881 18.6663 7.26659 18.6663 7.99992C18.6663 8.73325 18.4052 9.36103 17.883 9.88325C17.3608 10.4055 16.733 10.6666 15.9997 10.6666Z" fill="white"/>
            </g>
        </svg>
    </div>
    <div class="user-details-mobil-menu-unfolded d-none" id="userDetailsMobilMenuUnfolded">
        <div class="edit-mobil" id="openEditContactsMobil">
            <!-- Edit -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_133821_1220" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_133821_1220)">
                    <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                </g>
            </svg>
            <span>Edit</span>
        </div>
        <div class="delete-mobil" id="deleteContactMobil">
            <!-- Delete -->
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <mask id="mask0_133821_1225" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                    <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_133821_1225)">
                    <path d="M7.5 21C6.95 21 6.47917 20.8042 6.0875 20.4125C5.69583 20.0208 5.5 19.55 5.5 19V6C5.21667 6 4.97917 5.90417 4.7875 5.7125C4.59583 5.52083 4.5 5.28333 4.5 5C4.5 4.71667 4.59583 4.47917 4.7875 4.2875C4.97917 4.09583 5.21667 4 5.5 4H9.5C9.5 3.71667 9.59583 3.47917 9.7875 3.2875C9.97917 3.09583 10.2167 3 10.5 3H14.5C14.7833 3 15.0208 3.09583 15.2125 3.2875C15.4042 3.47917 15.5 3.71667 15.5 4H19.5C19.7833 4 20.0208 4.09583 20.2125 4.2875C20.4042 4.47917 20.5 4.71667 20.5 5C20.5 5.28333 20.4042 5.52083 20.2125 5.7125C20.0208 5.90417 19.7833 6 19.5 6V19C19.5 19.55 19.3042 20.0208 18.9125 20.4125C18.5208 20.8042 18.05 21 17.5 21H7.5ZM7.5 6V19H17.5V6H7.5ZM9.5 16C9.5 16.2833 9.59583 16.5208 9.7875 16.7125C9.97917 16.9042 10.2167 17 10.5 17C10.7833 17 11.0208 16.9042 11.2125 16.7125C11.4042 16.5208 11.5 16.2833 11.5 16V9C11.5 8.71667 11.4042 8.47917 11.2125 8.2875C11.0208 8.09583 10.7833 8 10.5 8C10.2167 8 9.97917 8.09583 9.7875 8.2875C9.59583 8.47917 9.5 8.71667 9.5 9V16ZM13.5 16C13.5 16.2833 13.5958 16.5208 13.7875 16.7125C13.9792 16.9042 14.2167 17 14.5 17C14.7833 17 15.0208 16.9042 15.2125 16.7125C15.4042 16.5208 15.5 16.2833 15.5 16V9C15.5 8.71667 15.4042 8.47917 15.2125 8.2875C15.0208 8.09583 14.7833 8 14.5 8C14.2167 8 13.9792 8.09583 13.7875 8.2875C13.5958 8.47917 13.5 8.71667 13.5 9V16Z" fill="#2A3647"/>
                </g>
            </svg>
            <span>Delete</span>
        </div>
    </div>
    <div class="board-label-mobil flex flex-row ">
        <div class="board-label-mobil-header">
            <span class="text-47px text-normal-700">Contacts</span>
            <span class="text-20px text-normal-400 mb-16">Better with a team</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="94" height="4" viewBox="0 0 94 4" fill="none">
                <path d="M92 2L2 2" stroke="#29ABE2" stroke-width="3" stroke-linecap="round"/>
            </svg>
        </div>
        <svg id="userDetailsMobilClose" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
        <path d="M13.0097 17.8855H30.1871C31.0362 17.8855 31.7246 18.5739 31.7246 19.4231C31.7246 20.2722 31.0362 20.9606 30.1871 20.9606H13.0097L20.17 28.1209C20.7704 28.7213 20.7704 29.6946 20.17 30.295C19.5697 30.8954 18.5963 30.8954 17.996 30.295L8.53824 20.8373C7.75719 20.0562 7.75719 18.7899 8.53824 18.0089L17.996 8.55115C18.5963 7.9508 19.5697 7.9508 20.17 8.55115C20.7704 9.1515 20.7704 10.1249 20.17 10.7252L13.0097 17.8855Z" fill="#29ABE2"/>
        </svg>
    </div>
    <div class="flex flex-col items-start gap-21 mt-48">
        <div class="flex items-center gap-20" id="userId" data-userUid="${user.uid}">
            <div class="user-overview-user-circle-big-mobil relative flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="${user.color}" stroke="white"
                        stroke-width="2" />
                </svg>
                <span class="absolute position-center  text-27px text-normal-400 white">${initiale}</span>
            </div>
            <span class="text-36px text-normal-700">${user.name}</span>
        </div>
        <div class="text-20px text-normal-400">Contact Information</div>
        <div class="flex flex-col items-start gap-22">
            <div class="flex flex-col items-start gap-15">
                <span class="text-16px text-normal-700">Email</span>
                <span class="text-16px text-normal-400 light-blue">${user.email}</span>
            </div>
            <div class="flex flex-col items-start gap-15">
                <span class="text-16px text-normal-700">Phone</span>
                <span class="text-16px text-normal-400">${user.phone}</span>
            </div>
        </div>
    </div>
`;