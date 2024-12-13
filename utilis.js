const fs = require('fs');
const path = require('path');

/**
 * Utility function to validate email format.
 * @param {string} email - Email address to validate.
 * @returns {boolean} True if email is valid, otherwise false.
 */
function validateEmail(email) {
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Utility function to validate PIN format.
 * Ensures PIN is numeric and of a specified length.
 * @param {string} pin - PIN to validate.
 * @param {number} length - Required length of the PIN.
 * @returns {boolean} True if PIN is valid, otherwise false.
 */
function validatePIN(pin, length = 4) {
    const pinRegex = new RegExp(`^\d{${length}}$`);
    return pinRegex.test(pin);
}

/**
 * Utility function to validate positive numeric input for transactions.
 * @param {number} amount - Amount to validate.
 * @returns {boolean} True if the amount is a positive number, otherwise false.
 */
function validateAmount(amount) {
    return typeof amount === 'number' && amount > 0;
}

/**
 * Utility function to safely read and parse JSON data from a file.
 * @param {string} filePath - Path to the JSON file.
 * @returns {object|null} Parsed JSON data, or null if an error occurs.
 */
function readJSON(filePath) {
    try {
        const data = fs.readFileSync(path.resolve(filePath), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file at ${filePath}:`, error.message);
        return null;
    }
}

/**
 * Utility function to write JSON data to a file.
 * @param {string} filePath - Path to the JSON file.
 * @param {object} data - Data to write to the file.
 */
function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing to JSON file at ${filePath}:`, error.message);
    }
}

/**
 * Utility function to display a formatted error message.
 * @param {string} message - Error message to display.
 */
function showError(message) {
    console.error(`[ERROR] ${message}`); // Plain text for errors
}

/**
 * Utility function to display a formatted success message.
 * @param {string} message - Success message to display.
 */
function showSuccess(message) {
    console.log(`[SUCCESS] ${message}`); // Plain text for success
}

/**
 * Utility function to display a formatted informational message.
 * @param {string} message - Informational message to display.
 */
function showInfo(message) {
    console.log(`[INFO] ${message}`); // Plain text for info
}

module.exports = {
    validateEmail,
    validatePIN,
    validateAmount,
    readJSON,
    writeJSON,
    showError,
    showSuccess,
    showInfo,
};