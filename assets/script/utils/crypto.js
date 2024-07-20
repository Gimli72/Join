/**
 * Create an UUID
 * @returns {`${string}-${string}-${string}-${string}-${string}`} UUID
 */
export function uuid() {
    const webCrypto = globalThis.crypto;
    return webCrypto.randomUUID();
}

/**
* 
* @param {string} str 
* @returns {Promise<string>}
*/
export async function toHash(str) {
    const webCrypto = globalThis.crypto;
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = await webCrypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

