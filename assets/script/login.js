import { getElementById, getImageElementById, getInputElementById } from './utils/standard.js';
import { useAuth } from './utils/use-auth.js';
import { useRouter } from './utils/router.js';
import { useUsers } from './utils/use-users.js';
import { useLocalStorage } from './utils/local-storage.js';
import { addClass, removeClass } from './utils/class.js';


/**
 * @typedef {import('../../types').User} User
 */

const { loginUser } = useAuth();
const { users } = await useUsers();


function checkScreenWidth() {
    if (window.innerWidth < 830) {
        addClass('.logo', 'logoAnimationMobile');
        removeClass('.logo', 'logoAnimation');
    } else {
        addClass('.logo', 'logoAnimation');
        removeClass('.logo', 'logoAnimationMobile');
    }
}


checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);


const formElement = getElementById('login-form');
const submitElement = getElementById('submit');
const emailElement = getInputElementById('email');
const passwordElement = getInputElementById('password');
const checkboxElement = getInputElementById('checkbox');
const guestLoginElement = getElementById('guestLogin');


submitElement.addEventListener('click', async (event) => {
    event.preventDefault();
    const { createItem } = useLocalStorage();

    const email = emailElement.value;
    const password = passwordElement.value;
    const checkbox = checkboxElement.checked;
    const logSuccessful = await loginUser({ email, password });
    if (logSuccessful === 'notFound') {
        addClass('#wrongPassword', 'done');
        removeClass('#userNotFound', 'done');
    }
    if (logSuccessful === 'wrongPassword') {
        addClass('#userNotFound', 'done');
        removeClass('#wrongPassword', 'done');        
    }
});


formElement.addEventListener('input', (event) => {

    event.preventDefault();
    const email = emailElement.value;
    const password = passwordElement.value;
    addClass('#userNotFound', 'done');
    addClass('#wrongPassword', 'done');

    if (validEmailCheck(email) && password) {
        removeClass('#submit', 'btn-primary-dark-disabled');
        addClass('#submit', 'btn-primary-dark');
        getInputElementById('submit').disabled = false;
    } else {
        addClass('#submit', 'btn-primary-dark-disabled');
        removeClass('#submit', 'btn-primary-dark');
        getInputElementById('submit').disabled = true;
    }
})

guestLoginElement.addEventListener('click', (event) => {

    const { createItem } = useLocalStorage();
    const { navigateTo } = useRouter();

    event.preventDefault();
    /**
     * @type {User}
    */
    const currentUser = { uid: 'guest', name: 'Guest', email: '', password: '', phone: '', color: '#FFFFFF' }

    createItem('user', currentUser)
    navigateTo('/summary.html', true)
});

passwordElement.addEventListener('focus', (event) => {
    if (!getImageElementById('passwordImg').classList.contains('pointer')) {
        getImageElementById('passwordImg').src = './assets/img/visibility_off.svg';
        addClass('#passwordImg', 'pointer')
    }
});

getElementById('passwordImg').addEventListener('click', (event) => {
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

/**
 * @description Checks the value entered for email validity.
 * @param {string} email 
 * @returns {boolean}
 */
export function validEmailCheck(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
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