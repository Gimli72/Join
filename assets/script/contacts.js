import { sideBarTemplate } from './templates/sidebar-template.js';
import { headerTemplate } from './templates/header-template.js';
// import { contactsTemplate } from './templates/contacts-templates.js';
import { getElementById, getElementsByQuery, getInputElementById } from './utils/standard.js';
import * as contactTemplates from './templates/contacts-templates.js';
// import { currentInitialeTemplate, separatorTemplate, userTemplate, userDetailsMobilTemplate, showUserDetailsTemplate, editContactsMobileTemplate, editContactsTemplate, addContactTemplate, addContactMobileTemplate } from './templates/contacts-templates.js';
import { headerInitiale } from './utils/navigation.js';
import { useAuth } from "../script/utils/use-auth.js";
import { useUsers } from './utils/use-users.js';
import { uuid } from './utils/crypto.js';
import { addClass, removeClass } from './utils/class.js';
import { useRemoteStorage } from './utils/remote-storage.js';
// import { } from '../script/utils/navigation.js';

/**
 * @typedef {import('../../types').User} User
 */

const { findOneById, deleteUser, getRandomColor, refreshUsers, userInitiale } = await useUsers();
let { users } = await useUsers();
const { createItem } = useRemoteStorage();
const { checkAuthGuard } = useAuth();

let mobil = false; 
window.addEventListener('resize', checkResolution);
checkResolution();

console.log(users);

function checkResolution() {
    if (window.innerWidth < 830) {
        mobil = true;
    } else {
        mobil = false;
    }
}

function addEventListenerOpenEditContacts() {
    getElementById('openEditContacts').addEventListener('click', (event) => {
        const element = getElementById('userId');
        const userUid = element ? element.getAttribute('data-userUid') : '';
        editContact(userUid);
        removeClass('#editContacts', 'done');
        addClass('#editContactsSlider', 'sliderRightIn');
        removeClass('#editContactsSlider', 'sliderRightOut');
    });

    getElementById('deleteContact').addEventListener('click', (event) => {
        const element = getElementById('userId');
        const userUid = element ? element.getAttribute('data-userUid') : '';
        userUid ? deleteContact(userUid) : '';
    });
}

function addEventListenerOpenEditContactsMobil() {
    getElementById('openEditContactsMobil').addEventListener('click', (event) => {
        const element = getElementById('userId');
        const userUid = element ? element.getAttribute('data-userUid') : '';
        editContactMobil(userUid);
    });

    getElementById('deleteContactMobil').addEventListener('click', (event) => {
        const element = getElementById('userId');
        const userUid = element ? element.getAttribute('data-userUid') : '';
        userUid ? deleteContact(userUid) : '';
    });
}

function addEventListenerOpenUserDetailsMobilMenu() {
    getElementById('userDetailsMobilMenu').addEventListener('click', (event) => {
        addClass('#userDetailsMobilMenuUnfolded', 'slideEditDeleteMenuMobil');
        addEventListenerOpenEditContactsMobil();
    });
}

function addEventListenerCloseEditContacts() {
    getElementById('closeEditContacts').addEventListener('click', (event) => {
        closeEditContacts();
    });
}

function closeEditContacts() {
    setTimeout(() => {
        addClass('#editContacts', 'done');
    }, 300);
    removeClass('#editContactsSlider', 'sliderRightIn');
    addClass('#editContactsSlider', 'sliderRightOut')
}

function addEventListenerOpenAddContact() {

    getElementById('openAddContact').addEventListener('click', openAddContact);
    getElementById('addNewContactMobil').addEventListener('click', openAddContactMobil);

    function openAddContact() {
        addContact();
        addClass('#addContactsSlider', 'sliderRightIn');
        removeClass('#addContactsSlider', 'sliderRightOut');
    }

    function openAddContactMobil() {
        addContact();
    }
}

function addEventListenerCloseAddContactMobil() {
    getElementById('overlayMobilExit').removeEventListener('click', closeAddContactMobil);
    getElementById('overlayMobilExit').addEventListener('click', closeAddContactMobil);
}

function addEventListenerCloseEditContactMobil() {
    getElementById('overlayEditContactsMobileExit').removeEventListener('click', closeEditContactMobil);
    getElementById('overlayEditContactsMobileExit').addEventListener('click', closeEditContactMobil);
}

function addEventListenerCloseUserDetailsMobil() {
    getElementById('userDetailsMobilClose').removeEventListener('click', closeShowUserDetailsMobil);
    getElementById('userDetailsMobilClose').addEventListener('click', closeShowUserDetailsMobil);
}

function addEventListenerCloseAddContact() {
    getElementById('closeAddContacts').addEventListener('click', closeAddContact);
}

function closeEditContactMobil() {
    addClass('#overlayMobil', 'done');
}

function closeAddContactMobil() {
    addClass('#overlayMobil', 'done');   
    removeClass('#addNewContactMobil', 'done');
    removeClass('#contactOverview', 'done');
}

function closeAddContact() {
    setTimeout(() => {
        addClass('#addContacts', 'done');
    }, 300);
    removeClass('#addContactsSlider', 'sliderRightIn');
    addClass('#addContactsSlider', 'sliderRightOut')
}

function addEventListenerSaveAndDeleteContact() {
    getElementById('saveContact').addEventListener('click', (event) => {
        event.preventDefault();
        const element = getElementById('userId');
        const userUid = element ? element.getAttribute('data-userUid') : '';
        userUid ? saveContact(userUid) : '';
    });
    getElementById('deleteEditContact').addEventListener('click', (event) => {
        const element = getElementById('userId');
        const userUid = element ? element.getAttribute('data-userUid') : '';
        userUid ? deleteContact(userUid) : '';
    });
}

function addEventListenerCancelAndCreateContact() {

    getElementById('createContact').addEventListener('click', (event) => {
        event.preventDefault();
        const newContact = {
            uid: uuid(),
            name: getInputElementById('name').value,
            email: getInputElementById('email').value,
            password: '',
            phone: getInputElementById('tel').value,
            color: getRandomColor()
        };
        users.push(newContact);
        createItem('keyUsers', users);
        refreshUsers();
        !mobil ? closeAddContact() : closeAddContactMobil();
        !mobil ? getElementById('userDetails').innerHTML = '' : '';
        renderContacts();
    });

    if (!mobil) {        
        getElementById('cancelAddContact').addEventListener('click', (event) => {
            event.preventDefault();
            closeAddContact();
        });
    }

    // Prüfen ob der "Sign up" Button gedrückt werden kann.
    getElementById('create-contact-form').addEventListener('input', () => {

        const nameElement = getInputElementById('name');
        const emailElement = getInputElementById('email');

        const name = nameElement.value;
        const email = emailElement.value;

        if (name && email) {
            removeClass('#createContact', 'btn-primary-dark-disabled');
            addClass('#createContact', 'btn-primary-dark');
            getInputElementById('createContact').disabled = false;
        } else {
            addClass('#createContact', 'btn-primary-dark-disabled');
            removeClass('#createContact', 'btn-primary-dark');
            getInputElementById('createContact').disabled = true;
        }
    })
}

/**
 * 
 * @param {*} char 
 * @returns 
 */
const usersByChar = (char) => users.filter(user => user.name[0].toUpperCase() === char).sort((a, b) => a.name.localeCompare(b.name));

/**
 * @description Assembling the user overview
 */
async function renderContacts() {
    await refreshUsers();
    const chars = [...new Set(users.map(user => user.name[0].toUpperCase()))].sort();
    const groupedUsers = chars.map(char => (
        {
            char,
            users: usersByChar(char)
        }
    ));
    const currentSection = getElementById('contactOverview');
    let html = '';
    groupedUsers.forEach((group) => {
        const { char, users } = group;
        html += contactTemplates.currentInitialeTemplate(char);
        html += contactTemplates.separatorTemplate();
        users.forEach((user) => {
            html += contactTemplates.userTemplate(user, userInitiale(user.name));
        });
    });
    currentSection.innerHTML = html;
    setupContainerClickListener();
}

/**
 * 
 * @param {string} id 
 * @param {boolean} setToActive 
 * @returns 
 */
function checkDivAktivStatus(id, setToActive = true) {
    getElementsByQuery('#contactOverview div.active').forEach((div) => {
        div.classList.remove('active');
        setToActive = div.id === id ? false : true;
    });
    setToActive ? getElementById(`${id}`).classList.add('active') : '';
    return setToActive;
}

//TODO JSdoc
/**
 * @description 
 * Checks if the menu item is already activated, if so it is reset including the user detail. 
 * If the query comes from the edit dialogue, Check is set to false
 * @param {string} userUid 
 * @param {boolean} check 
 */
function showUserDetails(userUid, check = true) {
    removeClass('#userDetails', 'slideUserDetails'); 
    const currentSection = getElementById('userDetails');
    currentSection.innerHTML = '';
    const aktiv = checkDivAktivStatus(userUid);    
    if (aktiv || !check) {
        const selectUser = findOneById(userUid);        
        if ((selectUser && aktiv) || !check) {
            //@ts-expect-error
            currentSection.innerHTML = contactTemplates.showUserDetailsTemplate(selectUser, userInitiale(selectUser.name));
            addEventListenerOpenEditContacts();
            removeClass('#userDetails', 'done');
            addClass('#userDetails', 'slideUserDetails'); 
        }
    }
}

function closeShowUserDetailsMobil() {
    const currentSection = getElementById('userDetailsMobil');
    currentSection.innerHTML = '';
    refreshUsers();
    renderContacts();
    removeClass('#addNewContactMobil', 'done');
    removeClass('#contactOverview', 'done');
}

function showUserDetailsMobil(userUid) {
    addClass('#addNewContactMobil', 'done');
    addClass('#contactOverview', 'done');
    const currentSection = getElementById('userDetailsMobil');
    currentSection.innerHTML = '';
    const selectUser = findOneById(userUid);
    if (selectUser) {
        currentSection.innerHTML = contactTemplates.userDetailsMobilTemplate(selectUser, userInitiale(selectUser.name));
        addEventListenerOpenUserDetailsMobilMenu();
        addEventListenerCloseUserDetailsMobil();
    }

}

function editContactMobil(userUid) {
    const currentSection = getElementById('overlayMobil');
    currentSection.innerHTML = '';
    const aktiv = checkDivAktivStatus(userUid);
    const selectUser = findOneById(userUid);
    if (selectUser) {
        currentSection.innerHTML = contactTemplates.editContactsMobileTemplate(selectUser, userInitiale(selectUser.name));
        removeClass('#overlayMobil', 'done');
        addEventListenerCloseEditContactMobil();
        addEventListenerSaveAndDeleteContact();
    }
}


function setupContainerClickListener() {
    const container = getElementById('contactOverview');
    container.removeEventListener('click', contactOverview);
    container.addEventListener('click', contactOverview);
}

function contactOverview(event) {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('.user-overview-user');
    if (target) {
        !mobil ? showUserDetails(target.id, true) : showUserDetailsMobil(target.id);
    }
}

function addContact() {
    if (mobil) {
        const currentSectionMobil = getElementById('overlayMobil');
        currentSectionMobil.innerHTML = '';
        currentSectionMobil.innerHTML = contactTemplates.addContactMobileTemplate();
        addClass('#addNewContactMobil', 'done');
        addClass('#contactOverview', 'done');
        removeClass('#overlayMobil', 'done');
        addEventListenerCloseAddContactMobil();
        addEventListenerCancelAndCreateContact();
    } else {
        const currentSection = getElementById('addContactsSlider');
        currentSection.innerHTML = '';
        currentSection.innerHTML = contactTemplates.addContactTemplate();
        removeClass('#addContacts', 'done');
        addEventListenerCloseAddContact();
        addEventListenerCancelAndCreateContact();
    }
}

async function editContact(userUid) {
    const currentSection = getElementById('editContactsSlider');
    currentSection.innerHTML = '';
    const selectUser = await findOneById(userUid);
    if (selectUser) {
        currentSection.innerHTML = contactTemplates.editContactsTemplate(selectUser, userInitiale(selectUser.name));
    }
    removeClass('#editContacts', 'done');
    addEventListenerCloseEditContacts();
    addEventListenerSaveAndDeleteContact();
}

/**
 * 
 * @param {string} userUid 
 */
async function deleteContact(userUid) {
    const answer = confirm("Sind Sie sich sicher ?")
    if (answer) {
        users = await deleteUser(userUid);
        if (mobil) {
            closeShowUserDetailsMobil();
        } else {
            closeEditContacts();
            getElementById('userDetails').innerHTML = '';
        }
        renderContacts();
        
    }
}

/**
 * 
 * @param {string} userUid 
 */
async function saveContact(userUid) {
    const selectUser = findOneById(userUid);
    if (selectUser) {
        const updateContactData = {
            'name': getInputElementById('editName').value,
            'email': getInputElementById('editEmail').value,
            'phone': getInputElementById('editTel').value,
        }
        const index = users.findIndex(user => user.uid === userUid);
        users[index] = { ...users[index], ...updateContactData };
        await createItem('keyUsers', users);
        refreshUsers();
        if (mobil) {              
            setTimeout(() => {
                showUserDetailsMobil(userUid);
                closeEditContactMobil();
            }, 150);
        } else {
            closeEditContacts();
            setTimeout(() => {
                showUserDetails(userUid, false);
                checkDivAktivStatus(userUid);
            }, 150);
        }
    }
}

getElementById('includeSideBar').innerHTML = sideBarTemplate();
getElementById('includeHeader').innerHTML = headerTemplate();
getElementById('content').innerHTML = contactTemplates.contactsTemplate();
getElementById('userInitials') ? headerInitiale() : '';

renderContacts();
addEventListenerOpenAddContact();