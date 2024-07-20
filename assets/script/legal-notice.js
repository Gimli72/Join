import { sideBarTemplate } from './templates/sidebar-template.js';
import { headerTemplate } from './templates/header-template.js';
import { legalNoticeTemplate } from './templates/legal-notice-template.js';
import { getElementById } from './utils/standard.js';
import { headerInitiale } from './utils/navigation.js';
import { defaultValuesTasksUsers } from './utils/default-values.js';
import { useAuth } from "../script/utils/use-auth.js";
import { useRouter } from "../script/utils/router.js";
import { } from '../script/utils/navigation.js';
import { addClass } from './utils/class.js';

const { checkAuthGuard, currentUser } = useAuth();
const { navigateBack, currentPage } = useRouter();
const urlReferrer = new URL(document.referrer).pathname

getElementById('includeSideBar').innerHTML = sideBarTemplate();
getElementById('includeHeader').innerHTML = headerTemplate();
getElementById('content').innerHTML = legalNoticeTemplate();
getElementById('userInitials') ? headerInitiale() : '';


if (urlReferrer === '/sign-up.html' || urlReferrer === '/login.html' || !currentUser) {
    addClass('.sideBarMenu', 'done');
    addClass('.sideBarMobil', 'done');
}

getElementById('container').addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (target instanceof Element) {
        target.closest('#blue-arrow') && currentPage !== urlReferrer ? navigateBack() : '';
        target.closest('#dummyTasks') ? defaultValuesTasksUsers() : '';
    }
});

