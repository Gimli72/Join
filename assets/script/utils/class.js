import { getElementByQuery } from "./standard.js";

/**
 * 
 * @param {string} query 
 * @param {string} className 
 */
export function addClass(query, className) {
    getElementByQuery(query).classList.add(className);
}

/**
 * 
 * @param {string} query 
 * @param {string} className 
 */
export function removeClass(query, className) {
    getElementByQuery(query).classList.remove(className);
}

/**
 * 
 * @param {string} query 
 * @param {string} className 
 */
export function toggleClass(query, className) {
    getElementByQuery(query).classList.toggle(className);
}

/**
 * 
 * @param {Element} element 
 * @param {string} className 
 */
export function addClassToElement(element, className) {
    element.classList.add(className);
}

/**
 * 
 * @param {Element} element 
 * @param {string} className 
 */
export function removeClassToElement(element, className) {
    element.classList.remove(className);
}

/**
 * 
 * @param {Element} element 
 * @param {string} className 
 */
export function toggleClassToElement(element, className) {
    element.classList.toggle(className);
}