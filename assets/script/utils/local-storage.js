/**
 * @typedef {import('../../../types').LocalStorageType} LocalStorageType
 */

export function useLocalStorage() {
    /**
     * @template { keyof LocalStorageType } K
     * @template { LocalStorageType[K] } V
     * @param {K} key
     * @param {V} value
     */
    function createItem(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * @template { keyof LocalStorageType } K
     * @template { LocalStorageType[K] } R
     * @param {K} key
     * @returns { R | null }
     */
    function getItem(key) {
        const item = localStorage.getItem(key);
        if (!item) {
            return null;
        }

        return JSON.parse(item);
    }

    /**
     * @template { keyof LocalStorageType } K
     * @param {K} key
     */
    function deleteItem(key) {
        return localStorage.removeItem(key);
    }

    return { createItem, getItem, deleteItem };
}