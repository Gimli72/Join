import { sideBarTemplate } from './templates/sidebar-template.js';
import { headerTemplate } from './templates/header-template.js';
import { privacyPoliceTemplate } from './templates/privacy-police-template.js';
import { getElementById } from './utils/standard.js';
import { headerInitiale } from './utils/navigation.js';
import { useAuth } from "../script/utils/use-auth.js";
import { useRouter } from "../script/utils/router.js";
import { } from '../script/utils/navigation.js';
import { addClass, removeClass } from './utils/class.js';

const { currentUser } = useAuth();
const { currentPage, navigateBack } = useRouter();

const urlReferrer = new URL(document.referrer).pathname

getElementById('includeSideBar').innerHTML = sideBarTemplate();
getElementById('includeHeader').innerHTML = headerTemplate();
getElementById('content').innerHTML = privacyPoliceTemplate();
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
    }
});