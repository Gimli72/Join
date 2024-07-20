// @ts-check

// ******************
//
// Standard Function
//
// ******************

/**
 * Checks whether the passed ID exists and returns the element.
 * @param {string} query
 * @returns {Element }
 */
export function getElementByQuery(query) {
    let element = document.querySelector(query);
    if (!element) {
        throw new Error(`Element with id ${query} not found!`);
    }
    return element;
}

/**
 * Checks whether the passed ID exists and returns the element.
 * @param {string} query
 * @returns {Element[]}
 */
export function getElementsByQuery(query) {
    let elements = document.querySelectorAll(query);
    if (!elements) {
        throw new Error(`Elements with id ${query} not found!`);
    }
    return [...elements];
}

/**
 * Checks whether the passed ID exists and returns the element.
 * @param {string} id
 * @returns {HTMLElement | HTMLImageElement | HTMLInputElement }
 */
export function getElementById(id) {
    let element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id ${id} not found!`);
    }
    return element;
}

/**
 * Checks whether the passed ID exists and returns the element.
 * @param {string} id
 * @returns {HTMLImageElement}
 */
export function getImageElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id ${id} not found!`);
    }
    // @ts-expect-error
    return element;
}

/**
 * Checks whether the passed ID exists and returns the element.
 * @param {string} id
 * @returns {HTMLInputElement}
 */
export function getInputElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id ${id} not found!`);
    }
    // @ts-expect-error
    return element;
}