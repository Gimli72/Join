import { getElementById, getImageElementById, getInputElementById } from './utils/standard.js';
import { toHash, uuid } from './utils/crypto.js';
import { useUsers } from './utils/use-users.js';
import { useRouter } from "../script/utils/router.js";
import { useRemoteStorage } from './utils/remote-storage.js';
import { addClass, removeClass } from './utils/class.js';


const { storeUser, getRandomColor, users } = await useUsers();

/**
 * @typedef {import('../../types').User} User
 */

const formElement = getElementById('sign-up-form');
const submitElement = getElementById('submit');
const passwordElement = getInputElementById('password');
const confirmPasswordElement = getInputElementById('confirmPassword');
const nameElement = getInputElementById('name');
const emailElement = getInputElementById('email');
const checkboxElement = getInputElementById('checkbox');

submitElement.addEventListener('click', async (event) => {
    event.preventDefault();
    const name = nameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;

    const { navigateTo } = useRouter();

    /**
     * @type {User}
     */
    const newUser = {
        uid: uuid(),
        name,
        email,
        password: await toHash(password),
        phone: '',
        color: getRandomColor()
    }
    
    const foundUser = await storeUser(newUser);
    console.log(foundUser);
    successfulMessage('You Signed Up successfully');
    setTimeout(() => {
        navigateTo('/login.html', true)
    }, 1500);
});

// Prüfen ob der "Sign up" Button gedrückt werden kann.
formElement.addEventListener('input', () => {

    const name = nameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;
    const checkbox = checkboxElement.checked;

    if (checkbox && name && validEmailCheck(email) && (password === confirmPassword)) {
        removeClass('#submit', 'btn-primary-dark-disabled');
        addClass('#submit', 'btn-primary-dark');
        getInputElementById('submit').disabled = false;
    } else {
        addClass('#submit', 'btn-primary-dark-disabled');
        removeClass('#submit', 'btn-primary-dark');
        getInputElementById('submit').disabled = true;
    }

    checkEmail(email);
    checkConfirmPassword(password, confirmPassword);
    checkPasswordLength(password);
})

/**
 * @description Check if valid e-mail
 * @param {string} email 
 * @returns 
 */
function checkEmail(email) {
    if (email && !validEmailCheck(email)) {
        removeClass('#notValidEmail', 'done');
        return;
    } else {
        addClass('#notValidEmail', 'done');
    }
}

/**
 * @description Checking the confirm password
 * @param {string} password 
 * @param {string} confirmPassword 
 * @returns 
 */
function checkConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword && confirmPassword) {
        removeClass('#passwordDoNotMatch', 'done');
        return;
    } else {
        addClass('#passwordDoNotMatch', 'done');
    }
}

/**
 * @description Check whether at least 8 characters have been entered for the password.
 * @param {string} password 
 * @returns 
 */
function checkPasswordLength(password) {
    if (password.length < 8 && password) {
        removeClass('#passwordTooShort', 'done');
        return;
    } else {
        addClass('#passwordTooShort', 'done');
    }
}

getElementById('container').addEventListener('click', (event) => {
    const { navigateTo, currentPage } = useRouter();
    // event.preventDefault();
    const target = event.target;
    if (target instanceof Element) {
        target.closest('.legalNotice') && currentPage !== '/legalNotice.html' ? navigateTo('/legalNotice.html') : '';
        target.closest('.privacyPolicy') && currentPage !== '/privacyPolice.html' ? navigateTo('/privacyPolice.html') : '';
    }
});


// Icon für die Passworteingabe ändern/überprüfen
passwordElement.addEventListener('focus', () => {
    if (!getImageElementById('passwordImg').classList.contains('pointer')) {
        getImageElementById('passwordImg').src = './assets/img/visibility_off.svg';
        addClass('#passwordImg', 'pointer');
    }
});

getElementById('passwordImg').addEventListener('click', () => {
    if (getImageElementById('passwordImg').classList.contains('pointer')) {
        if (getInputElementById('password').type === 'text') {
            getImageElementById('passwordImg').src = './assets/img/visibility_off.svg';
            getInputElementById('password').type = 'password';
        } else {
            getImageElementById('passwordImg').src = './assets/img/visibility.svg';
            getInputElementById('password').type = 'text';
        }
    }
});

// Icon für das Bestätigungspasswort ändern/überprüfen
confirmPasswordElement.addEventListener('focus', () => {
    if (!getImageElementById('confirmPasswordImg').classList.contains('pointer')) {
        getImageElementById('confirmPasswordImg').src = './assets/img/visibility_off.svg';
        addClass('#confirmPasswordImg', 'pointer');
    }
});

getElementById('confirmPasswordImg').addEventListener('click', () => {
    if (getImageElementById('confirmPasswordImg').classList.contains('pointer')) {
        if (getInputElementById('confirmPassword').type === 'text') {
            getImageElementById('confirmPasswordImg').src = './assets/img/visibility_off.svg';
            getInputElementById('confirmPassword').type = 'password';
        } else {
            getImageElementById('confirmPasswordImg').src = './assets/img/visibility.svg';
            getInputElementById('confirmPassword').type = 'text';
        }
    }
});

/**
 * 
 * @param {string} text 
 */
async function successfulMessage(text) {
    removeClass('#shortInfoMessageBg', 'd-none');
    getElementById('shortInfoMessageText').textContent = text;
    removeClass('#shortInfoMessage', 'slideOutFromBottom');
    addClass('#shortInfoMessage', 'slideInFromBottom');
    setTimeout(() => {
        removeClass('#shortInfoMessage', 'slideInFromBottom');
        addClass('#shortInfoMessage', 'slideOutFromBottom');
        addClass('#shortInfoMessageBg', 'd-none');
    }, 1500);
}

/**
 * @description Checks the value entered for email validity.
 * @param {string} email 
 * @returns {boolean}
 */
export function validEmailCheck(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
}