import { useRemoteStorage } from './remote-storage.js';

/**
 * @typedef {import('../../../types').User} User
 * @typedef {import('../../../types').Colors } Colors
 */

/**
 * @type {Colors}
 */
const userColors = {
    colors: [
        '#ff7a01', // Orange
        '#ff5eb3', // Pink
        '#6e52ff', // Light Blue
        '#9326fe', // Dark Violet
        '#01bee8', // Cyan
        '#20d7c1', // Turquoise
        '#ff745f', // Salmon
        '#ffa35e', // Peach
        '#fc71ff', // Magenta
        '#ffc702', // Yellow
        '#0038ff', // Blue
        '#c3ff2b', // Lime Green
        '#ffe62a', // Lemon Yellow
        '#ff4546', // Light Red
        '#feba29'  // Gold
    ]
};

/**
 * Randomly select a color for the user avatar
 * @returns {string}
 */
export function getRandomColor() {
    const randomColorIndex = Math.floor(Math.random() * userColors.colors.length);
    return userColors.colors[randomColorIndex];
}

export async function useUsers() {
    const { createItem, getItem } = useRemoteStorage();

    let users = await getAllUsers();

    /**
     * @description Refresh users from remote storage
     * @returns { Promise<User[]> }
     */
    async function refreshUsers() {
        users = await getAllUsers();
        return users;
    }

    /**
     * @description Get all users from remote storage
     * @returns { Promise<User[]> }
     */
    async function getAllUsers() {
        const users = await getItem('keyUsers');
        return users ? users : [];
    }

    /**
     * @description Get single user by email
     * @param {string} email
     * @returns { Promise<User | undefined> }
     */
    async function findOneByMail(email) {
        await refreshUsers();
        return users.find((user) => user.email === email);
    }

    /**
     * @description Get single user by id
     * @param {string} id
     * @returns // { Promise<User | undefined> }
     */
    function findOneById(id) {
        // await refreshUsers();
        return users.find((user) => user.uid === id);
    }

    /**
     * @description Store user in remote storage
     * @param {User} newUser
     */
    async function storeUser(newUser) {
        await refreshUsers();
        const foundUser = await findOneByMail(newUser.email);
        if (foundUser && foundUser.password) {
            console.error('Neuer Nutzer schon vorhanden!');
            return foundUser;
        } else {
            users.push(newUser);
            createItem('keyUsers', users);
        }
    }

    /**
     * @description Delete user from remote storage
     * @param {string} uid
     * @returns { Promise<User[]> }
     */
    async function deleteUser(uid) {
        let users = await getAllUsers();
        users = users.filter((user) => user.uid !== uid);
        createItem('keyUsers', users);
        users = await refreshUsers();
        return users;
    }

    /**
     * @description Output the user's initials
     * @param {string} user 
     * @returns {string}
     */
    function userInitiale(user) {
        const [firstname, lastname] = user.split(' ');
        return `${firstname[0].toUpperCase()}${lastname ? lastname[0].toUpperCase() : ''}`;
    }

    return { users, refreshUsers, deleteUser, findOneByMail, findOneById, storeUser, getRandomColor, userInitiale };
}

