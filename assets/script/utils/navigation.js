import { useLocalStorage } from "./local-storage.js";
import { getElementById } from './standard.js';
import { useRouter } from "./router.js";
import { useUsers } from './use-users.js';
import { addClass, removeClass } from '../utils/class.js';

const { navigateTo, currentPage } = useRouter();
const { getItem, deleteItem } = useLocalStorage();
const { userInitiale } = await useUsers();

const currentUser = getItem('user');

getElementById('container').addEventListener('click', (event) => {    
    event.preventDefault();
    const target = event.target;
    if (target instanceof Element) {
        // Navigation Header
        target.closest('#helpBtn') && currentPage !== '/help.html' ? navigateTo('/help.html') : '';
        target.closest('#userInitialsClick') && getElementById('headerMenu').classList.contains('done') ? headerMenuOpen() : headerMenuClose();
        target.closest('#userInitialsClickMobil') && getElementById('headerMobilMenu').classList.contains('done') ? headerMenuMobilOpen() : headerMenuMobilClose();
        // Navigation
        target.closest('#sideBarLogo') && currentPage !== '/summary.html' ? navigateTo('/summary.html') : '';
        target.closest('#contactsLink, #contactsLinkMobil') && currentPage !== '/contacts.html' ? navigateTo('/contacts.html') : '';
        target.closest('#boardLink, #boardLinkMobil') && currentPage !== '/board.html' ? navigateTo('/board.html') : '';
        target.closest('#summaryLink, #summaryLinkMobil') && currentPage !== '/summary.html' ? navigateTo('/summary.html') : '';
        target.closest('#addTaskLink, #addTaskLinkMobil') && currentPage !== '/addTask.html' ? navigateTo('/addTask.html') : '';
        // Header Menu
        target.closest('.legalNotice') && currentPage !== '/legalNotice.html' ? navigateTo('/legalNotice.html') : '';
        target.closest('.privacyPolicy') && currentPage !== '/privacyPolice.html' ? navigateTo('/privacyPolice.html') : '';
        target.closest('#headerLogOut, #headerMobilLogOut') ? logOut() : '';
    }    
});

export function headerInitiale() {
    currentPage === '/legalNotice.html' || currentPage === '/privacyPolice.html' ? addClass('#helpInitialsIcon', 'done') : removeClass('#helpInitialsIcon', 'done');
    currentUser ? getElementById('userInitials').innerHTML = userInitiale(currentUser.name) : '';
    currentUser?.name === 'Guest' ? addClass('.headerInitiale', 'text-20px') : addClass('.headerInitiale', 'text-16px');
    currentUser ? getElementById('userInitialsDesktop').innerHTML = userInitiale(currentUser.name) : '';
}

function headerMenuMobilOpen() {    
    removeClass('#headerMobilMenu', 'slideOutHeaderMenuMobil');
    addClass('#headerMobilMenu', 'slideHeaderMenuMobil');
    removeClass('#headerMobilMenu', 'done');
}

function headerMenuMobilClose() {
    removeClass('#headerMobilMenu', 'slideHeaderMenuMobil');
    addClass('#headerMobilMenu', 'slideOutHeaderMenuMobil');
    setTimeout(() => {
        addClass('#headerMobilMenu', 'done');
    }, 125);
    
}

function headerMenuOpen() {
    removeClass('#headerMenu', 'done');
}

function headerMenuClose() {
    addClass('#headerMenu', 'done');
}

function logOut() {
    deleteItem('user');
    navigateTo('/login.html');
}