export function useRouter() {
    const routes = {
        '/': 'home',
        '/login.html': 'login',
        '/sign-up.html': 'sign-up',
        '/contacts.html': 'contacts',
        '/help.html': 'help',
        '/summary.html': 'summary',
        '/board.html': 'board',
        '/addTask.html': 'addTask',
        '/legalNotice.html': 'legal-notice',
        '/privacyPolice.html': 'privacy-police',
    };

    const currentPage = window.location.pathname || '/';
    const currentPageName = routes[currentPage];

    const referrerPath = document.referrer ?  new URL(document.referrer).pathname : '/';

    const navigateBack = () => {
        if (referrerPath !== currentPage) {
            window.location.href = referrerPath;
        } else {
            window.location.href = '/';
        }
    }

    /**
     * 
     * @param {keyof typeof routes} path
     * @param {boolean} [replace=false]
     */
    const navigateTo = (path, replace = false) => {
        if (replace) {
            window.location.replace(path);
        } else {
            window.location.href = path;
        }
    };
    return { currentPage, navigateTo, currentPageName, navigateBack };
}