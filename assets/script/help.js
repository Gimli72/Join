import { sideBarTemplate } from './templates/sidebar-template.js';
import { headerTemplate } from './templates/header-template.js';
import { helpTemplate } from './templates/help-template.js';
import { getElementById } from './utils/standard.js';
import { headerInitiale } from './utils/navigation.js';
import { useAuth } from "../script/utils/use-auth.js";
import { useRouter } from "../script/utils/router.js";

const { checkAuthGuard } = useAuth();
const { currentPage, navigateBack } = useRouter();

const urlReferrer = new URL(document.referrer).pathname

getElementById('includeSideBar').innerHTML = sideBarTemplate();
getElementById('includeHeader').innerHTML = headerTemplate();
getElementById('content').innerHTML = helpTemplate();
getElementById('userInitials') ? headerInitiale() : '';

getElementById('container').addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (target instanceof Element) {
        target.closest('.blue-arrow') && currentPage !== urlReferrer ? navigateBack() : '';
    }
});