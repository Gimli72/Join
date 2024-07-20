import { sideBarTemplate } from './templates/sidebar-template.js';
import { headerTemplate } from './templates/header-template.js';
import { summaryTemplate } from './templates/summary-templates.js';
import { getElementById } from './utils/standard.js';
import { headerInitiale } from './utils/navigation.js';
import { useAuth } from "../script/utils/use-auth.js";
import { useLocalStorage } from "./utils/local-storage.js";
import { useRemoteStorage } from './utils/remote-storage.js';
import { useRouter } from "../script/utils/router.js";
// import { } from '../script/utils/navigation.js';
import { removeClass } from './utils/class.js';

const { navigateTo, currentPage } = useRouter();
const { checkAuthGuard } = useAuth();
const { getItem } = useLocalStorage();
const { getItem: remoteGetItem } = useRemoteStorage();

/**
 * @typedef {import('../../types').Task} Task
 * @typedef {import('../../types').TaskStatus} TaskStatus
 */

/**
 * @type {Task[] | null}
 */
const tasks = await remoteGetItem('keyProjects');


const timesOfDay = [
    {
        'text': 'Good morning',
        'from': '00:00',
        'to': '11:59'
    },
    {
        'text': 'Good afternoon',
        'from': '12:00',
        'to': '16:59'
    },
    {
        'text': 'Good evening',
        'from': '17:00',
        'to': '23:59'
    }
];

const currentUser = getItem('user');
const urlReferrer = new URL(document.referrer).pathname

deadline();

getElementById('container').addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (target instanceof Element) {
        target.closest('.boardLink') && currentPage !== '/board.html' ? navigateTo('/board.html') : '';
    }
});


function welcomeText() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    for (const timeOfDay of timesOfDay) {
        if (currentTime >= timeOfDay.from && currentTime <= timeOfDay.to) {
            return timeOfDay.text;
        }
    }
    return "Hello";
}


function todo() {
    /**
     * @type {TaskStatus}
     */
    const status = {
        todo: tasks ? tasks.filter((task) => task.status === 'todo').length : 0,
        done: tasks ? tasks.filter((task) => task.status === 'done').length : 0,
        board: tasks ? tasks.length : 0,
        progress: tasks ? tasks.filter((task) => task.status === 'progress').length : 0,
        feedback: tasks ? tasks.filter((task) => task.status === 'feedback').length : 0,
        urgent: tasks ? tasks.filter((task) => task.prio === 'urgent').length : 0,
    };
    return status;
}

/**
 * @description Find out the next deadline date
 * @returns {string} Date or text
 */
function deadline() {
    const urgentTasks = tasks ? tasks.filter((v) => v.prio === 'urgent') : null;
    if (urgentTasks && urgentTasks.length > 0) {
        let nextDeadline = new Date().getTime();
        urgentTasks.forEach((urgentTask) => {
            const urgentTaskDate = new Date(urgentTask.dueDate).getTime();
            nextDeadline = nextDeadline < urgentTaskDate ? nextDeadline : urgentTaskDate;
        })
        const date = new Date(nextDeadline);
        const deadline = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
        return deadline;
    }
    return 'No urgent tasks'
}

// Rendering the page
getElementById('includeSideBar').innerHTML = sideBarTemplate();
getElementById('includeHeader').innerHTML = headerTemplate();
getElementById('content').innerHTML = summaryTemplate(todo());
getElementById('dateDeadline').innerHTML = deadline();
getElementById('userInitials') ? headerInitiale() : '';

if (urlReferrer !== '/login.html') {
    removeClass('#welcomeText', 'responsive-welcomeText')
} 

// Welcome text
if (currentUser) {
    getElementById('greeting').innerHTML = currentUser.name !== 'Guest' ? welcomeText() + "," : welcomeText();
    getElementById('user').innerHTML = currentUser.name !== 'Guest' ? currentUser.name : '';
}
