// @ts-check

/**
 * Template for the header (desktop and mobile)
 * @returns html code
 */
export const headerTemplate = () => /*html*/ `
    <!-- mobile version   -->
    <div class="headerMobil fixed flex items-center justify-between">
        <div class="headerMobilLogo pointer">
            <img src="/assets/img/logoMobil.svg">
        </div>
        <div class="headerMobileInitials pointer">
            <div class="user-overview-user-circle relative pointer" id="userInitialsClickMobil">
                <svg xmlns="http://www.w3.org/2000/svg" class="bgHeaderInitiale" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <circle cx="21" cy="21" r="20" fill="" stroke="black" stroke-width="2" />
                </svg>
                <span class="absolute position-center text-normal-400 headerInitiale" id="userInitials"></span>
            </div>
            <div class="headerMenu absolute flex flex-col done" id="headerMobilMenu">
                <div class="headerMenuItem flex text-16px text-normal-400 items-center pointer legalNotice">Legal Notice</div>
                <div class="headerMenuItem flex text-16px text-normal-400 items-center pointer privacyPolicy">Privacy Policy</div>
                <div class="headerMenuItem flex text-16px text-normal-400 items-center pointer" id="headerMobilLogOut">Log out</div>
            </div>
        </div>
    </div>
    <!-- desktop version -->
    <div id="header" class="flex justify-between items-center black text-normal-400 relative">
        <span class="text-20px text-normal-400 items-center">
            Kanban Project Management Tool
        </span>
        <div class="flex justify-center items-center gap-16" id="helpInitialsIcon">
            <img id="helpBtn" class="pointer" src="./assets/img/summaryImg/helpIcon.svg"
                alt="button for help">
            <div class="user-overview-user-circle relative pointer" id="userInitialsClick">
                <svg xmlns="http://www.w3.org/2000/svg" class="bgHeaderInitiale" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <circle cx="21" cy="21" r="20" fill="" stroke="black" stroke-width="2" />
                </svg>
                <span class="absolute position-center text-normal-400 headerInitiale" id="userInitialsDesktop"></span>
            </div>
        </div>
        <div class="headerMenu absolute flex flex-col done" id="headerMenu">
            <div class="headerMenuItem flex text-16px text-normal-400 items-center pointer legalNotice">Legal Notice</div>
            <div class="headerMenuItem flex text-16px text-normal-400 items-center pointer privacyPolicy">Privacy Policy</div>
            <div class="headerMenuItem flex text-16px text-normal-400 items-center pointer" id="headerLogOut">Log out</div>
        </div>
    </div>
`;