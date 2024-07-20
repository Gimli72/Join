'use strict';

import { uuid } from './crypto.js';
import { useLocalStorage } from './local-storage.js';
import { useRemoteStorage } from './remote-storage.js';
import { useRouter } from './router.js';

const { navigateTo } = useRouter();

/**
 * @typedef {import('../../../types.js').Task} Task
 * @typedef {import('../../../types.js').User} User
 */

/**
 * @type {Task[] | null}
 */
let tasks = [];

/**
 * @type {User[]}
 */
let users = [];

const { createItem } = useRemoteStorage();
const { deleteItem } = useLocalStorage();

export function defaultValuesTasksUsers() {

    tasks = [];
    users = [];

    const task1 = {

        id: uuid(),
        title: 'Kochwelt Page & Recipe Recommender',
        description: 'Build start page with recipe recommendation.',
        contacts: ['d9c09664-1e01-46b9-8eaa-d5114eb5dfdd', '2353158c-63c0-4033-b494-f34c8be64473', 'a500b59b-0fd7-483f-8871-64e6db24d402'],
        dueDate: '2024-05-10',
        prio: 'medium',
        category: 'User Story',
        subtask: [
            {
                id: uuid(),
                status: true,
                title: 'Implement Recipe Recommendation'
            },
            {
                id: uuid(),
                status: false,
                title: 'Start Page Layout'
            },
            {
                id: uuid(),
                status: true,
                title: 'End Page Layout'
            },

        ],
        status: 'progress',
    };

    tasks.push(task1);

    const task2 = {
        id: uuid(),
        title: 'HTML Base Template Creation',
        description: 'Create reusable HTML base templates.',
        contacts: ['d9c09664-1e01-46b9-8eaa-d5114eb5dfdd', '2353158c-63c0-4033-b494-f34c8be64473', 'a500b59b-0fd7-483f-8871-64e6db24d402'],
        dueDate: '2024-07-16',
        prio: 'low',
        category: 'Technical Task',
        subtask: '',
        status: 'feedback',
    };

    tasks.push(task2);

    const task3 = {
        id: uuid(),
        title: 'CSS Architecture Planning',
        description: 'Define CSS naming conventions and structure.',
        contacts: ['d9c09664-1e01-46b9-8eaa-d5114eb5dfdd', 'a500b59b-0fd7-483f-8871-64e6db24d402'],
        dueDate: '2024-09-02',
        prio: 'urgent',
        category: 'Technical Task',
        subtask: [
            {
                id: uuid(),
                status: false,
                title: 'Establish CSS Methodology'
            },
            {
                id: uuid(),
                status: false,
                title: 'Setup Base Styles'
            },

        ],
        status: 'done',
    };

    tasks.push(task3);

    const task4 = {
        id: uuid(),
        title: 'Daily Kochwelt Recipe',
        description: 'Implement daily recipe and portion calculator.',
        contacts: ['d9c09664-1e01-46b9-8eaa-d5114eb5dfdd', '2353158c-63c0-4033-b494-f34c8be64473'],
        dueDate: '2024-04-11',
        prio: 'medium',
        category: 'User Story',
        subtask: '',
        status: 'feedback',
    };

    tasks.push(task4);

    const task5 = {
        id: uuid(),
        title: 'Contact Form & Imprint',
        description: 'Create a contact form and imprint page.',
        contacts: ['d9c09664-1e01-46b9-8eaa-d5114eb5dfdd', '2353158c-63c0-4033-b494-f34c8be64473', 'a500b59b-0fd7-483f-8871-64e6db24d402'],
        dueDate: '2024-06-28',
        prio: 'urgent',
        category: 'User Story',
        subtask: '',
        status: 'todo',
    };

    tasks.push(task5);

    const user1 = {
        uid: 'e7569a6f-cc03-42a4-b45f-b4e66f035be3',
        name: 'Anton Mayer',
        phone: '49 1111 111 11 1',
        password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
        email: 'anton@gmail.com',
        color: '#feba29'
    };

    users.push(user1);

    const user2 = {
        uid: 'd9c09664-1e01-46b9-8eaa-d5114eb5dfdd',
        name: 'Anja Schulz',
        phone: '412412',
        password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
        email: 'schulz@hotmail.com',
        color: '#ff745f'
    };

    users.push(user2);

    const user3 = {
        uid: '943fbc5c-843d-4348-9819-3140f21ce5a1',
        name: 'Benedikt Ziegler',
        phone: 'aaaaaaa',
        password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
        email: 'benedikt@gmail.com',
        color: '#ffc702'
    };

    users.push(user3);

    const user4 = {
        uid: '3bea30c5-e1e1-40ea-bdf9-8177b9a82c66',
        name: 'David Eisenberg',
        phone: '',
        password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
        email: 'davidberg@gmail.com',
        color: '#fc71ff'
    };

    users.push(user4);

    const user5 = {
        uid: 'a500b59b-0fd7-483f-8871-64e6db24d402',
        name: 'Eva Fischer',
        phone: '',
        password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
        email: 'eva@gmail.com',
        color: '#c3ff2b'
    };

    users.push(user5);

    const user6 = {
        uid: '52aba4b8-845f-47cf-be7c-448b6f05b3bb',
        name: 'Emmanuel Mauer',
        phone: '',
        password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
        email: 'emmanuelma@gmail.com',
        color: '#ffc702'
    };

    users.push(user6);

    const user7 = {
        uid: '2353158c-63c0-4033-b494-f34c8be64473',
        name: 'Marcel Bauer',
        phone: '',
        password: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
        email: 'bauer@gmail.com',
        color: '#6e52ff'
    };

    users.push(user7);

    const user8 = {
        uid: '0bd07555-50ab-4497-82ba-64726d5fd3ed',
        name: 'Thomas Greff',
        phone: '',
        password: '51abb9636078defbf888d8457a7c76f85c8f114c',
        email: 't.greff@t-online.de',
        color: '#feba29'
    };

    users.push(user8);

    const user9 = {
        uid: '0fc018a8-680a-427e-85fc-87e5a35db346',
        name: 'Wolfgang Strutzenberger',
        phone: '',
        password: 'ee0c9b4546196cebda3212f5c0e8b0bbb04ba0fa',
        email: 'w.strutzenberger@mailfence.com',
        color: '#01bee8'
    };

    users.push(user9);

    const user10 = {
        uid: '94acd4e1-2424-40e0-ad5c-8a3df7b916aa',
        name: 'Stefan Droste',
        phone: '',
        password: '6adfb183a4a2c94a2f92dab5ade762a47889a5a1',
        email: 'stefan.droste1@gmx.net',
        color: '#c3ff2b'
    };

    users.push(user10);

    console.log('tasks zurückgesetzt', tasks);
    console.log('users zurückgesetzt', users);

    // createItem('keyProjects', tasks);
    // createItem('keyUsers', users);

    // deleteItem('user');
    // navigateTo('/login.html');
}