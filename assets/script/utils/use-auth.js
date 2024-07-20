import { toHash } from "./crypto.js";
import { useLocalStorage } from "./local-storage.js";
import { useRouter } from "./router.js";
import { useUsers } from "./use-users.js";

const { createItem, getItem, deleteItem } = useLocalStorage();
const { findOneByMail } = await useUsers();

/**
 * @typedef {Object} AuthOptions
 * @property {boolean} authGuard
 * @param {AuthOptions} options
 */
export function useAuth(options = { authGuard: true }) {
    const { authGuard } = options;
    const {navigateTo} = useRouter();
    const currentPage = window.location.pathname;

    let currentUser = getItem('user')

    function checkAuthGuard() {
        if (authGuard && !currentUser && currentPage !== '/login.html' && currentPage !== '/sign-up.html' && currentPage !== '/privacyPolice.html' && currentPage !== '/legalNotice.html') {
            // redirect to login page
            navigateTo('/login.html', true)
        } 
        return false;
    }

    checkAuthGuard();

    /**
     * @typedef {Object} LoginUserDto
     * @property {string} email
     * @property {string} password
     * @param {LoginUserDto} dto  
     */
    async function loginUser(dto) {
        const { email, password } = dto;
        const foundUser = await findOneByMail(email);
        if (foundUser && foundUser.password === await toHash(password)) {
            createItem('user', foundUser)
            currentUser = foundUser
            //TODO Später ändern auf '/'
            navigateTo('/summary.html', true)
        }
        if (!foundUser) {
            return 'notFound';
        }
        if (foundUser && foundUser.password !== await toHash(password)) {
            return 'wrongPassword';
        }
    }

    function logoutUser() {
        deleteItem('user');
        currentUser = null;
        navigateTo('/login.html', true);
    }

    return { currentUser, loginUser, logoutUser, checkAuthGuard };

}