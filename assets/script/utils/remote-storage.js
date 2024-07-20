const STORAGE_TOKEN = 'ZGIU1L5OZNO83MZQLVOAKDKWS6EXY0NEDDPYXM18';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
/**
 * @typedef {import('../../../types').RemoteStorageType} RemoteStorageType
 */

export function useRemoteStorage() {
    
    /**
     * @template { keyof RemoteStorageType } K
     * @template { RemoteStorageType[K] | null } V
     * @param {K} key
     * @param {V} value
     * @returns {Promise<RemoteStorageType>}
     */
    async function createItem(key, value) {
        const payload = {
            key,
            value: JSON.stringify(value),
            token: STORAGE_TOKEN,
        };
        const res = await fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) });
        return await res.json();
    }

    /**
     * @template { keyof RemoteStorageType } K
     * @template { RemoteStorageType[K] } R
     * @param {K} key
     * @returns {Promise<R | null>}
     */
    async function getItem(key) {
        const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
        const res = await fetch(url);
        if (res.status === 404) {
            return null;
        }
        const data = await res.json();
        if (data.status === 'error') {
            return null;
        } else {
            return JSON.parse(data.data.value);
        }
    }

    /**
     * @template { keyof RemoteStorageType } K
     * @param {K} key
     */
    async function deleteItem(key) {
        return createItem(key, null);
    }

    return { createItem, getItem, deleteItem };
}
