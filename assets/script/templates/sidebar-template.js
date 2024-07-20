// @ts-check

import { useRouter } from "../utils/router.js";
const { currentPage } = useRouter();

/**
 * Template for the sidebar (desktop and mobile)
 * @returns html code
 */
export const sideBarTemplate = () => /*html*/ `
    <div class="sideBarMobil">
        <div class="sideBarItemMobil" id="summaryLinkMobil">
            <img src="/assets/img/summaryMobil.svg">
            <p class="text-14px text-normal-400 m-0">Summary</p>
        </div>
        <div class="sideBarItemMobil" id="boardLinkMobil">
            <img src="/assets/img/boardMobil.svg">
            <p class="text-14px text-normal-400 m-0">Board</p>
        </div>
        <div class="sideBarItemMobil" id="addTaskLinkMobil">
            <img src="/assets/img/addTasksMobil.svg">
            <p class="text-14px text-normal-400 m-0">Add Tasks</p>
        </div>
        <div class="sideBarItemMobil" id="contactsLinkMobil">
            <img src="/assets/img/contactsMobil.svg">
            <p class="text-14px text-normal-400 m-0">Contacts</p>
        </div>
    </div>
    <div class="sideBar" id="sideBar">
        <div class="sideBarLogo pointer" id="sideBarLogo">
            <img src="/assets/img/summaryImg/joinSidbarIcon.svg">
        </div>
        <div class="sideBarMenu flex flex-col gap-15" id="sideBarMenu">
            <div class="sideBarLinks ${currentPage === '/summary.html' ? 'sideBarAktiv' : ''}" id="summaryLink">
                <div class="flex items-center gap-8">
                    <img src="/assets/img/summary.svg" alt="">
                    <span class="pointer text-normal-400 text-16px">Summary</span>
                </div>
            </div>
            <div class="sideBarLinks  ${currentPage === '/addTask.html' ? 'sideBarAktiv' : ''}" id="addTaskLink">
                <div class="flex items-center gap-8">
                    <img src="/assets/img/addTask.svg" alt="">
                    <span class="pointer text-normal-400 text-16px">Add Task</span>
                </div>
            </div>
            <div class="sideBarLinks  ${currentPage === '/board.html' ? 'sideBarAktiv' : ''}" id="boardLink">
                <div class="flex items-center gap-8">
                    <img src="/assets/img/board.svg" alt="">
                    <span class="pointer text-normal-400 text-16px">Board</span>
                </div>
            </div>
            <div class="sideBarLinks  ${currentPage === '/contacts.html' ? 'sideBarAktiv' : ''}" id="contactsLink">
                <div class="flex items-center gap-8">
                    <img src="/assets/img/contacts.svg" alt="">
                    <span class="pointer text-normal-400 text-16px">Contacts</span>
                </div>
            </div>
        </div>
        <div class="menuBottom flex flex-col gap-10">
            <span class="pointer privacyPolicy ${currentPage === '/privacyPolice.html' ? 'menuBottomItemAktive' : 'menuBottomItem'}">Privacy Police</span>
            <span class="pointer legalNotice ${currentPage === '/legalNotice.html' ? 'menuBottomItemAktive' : 'menuBottomItem'}">Legal notice</span>
        </div>
    </div>
`;
