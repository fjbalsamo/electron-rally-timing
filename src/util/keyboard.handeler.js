/**
 * find one html element with id `${sufix}_${prefix}` and set focus in him
 * @param {string} sufix 
 * @param {string} prefix 
 */
export const focusGained = (sufix, prefix) => {
    
    document.getElementById(`${sufix}_${prefix}`).focus();
    document.getElementById(`${sufix}_${prefix}`).select();
}

/**
 * find one html element with id `start_${prefix}` and set focus in him
 * @param {string} prefix 
 */
export const startFocus = (prefix) => (focusGained('start', prefix));

/**
 * find one html element with id `arrival_${prefix}` and set focus in him
 * @param {string} prefix 
 */
export const arrivalFocus = (prefix) => (focusGained('arrival', prefix));

/**
 * find one html element with id `assign_${prefix}` and set focus in him
 * @param {string} prefix 
 */
export const assignFocus = (prefix) => (focusGained('assign', prefix));

/**
 * find one html element with id `penalty_${prefix}` and set focus in him
 * @param {string} prefix 
 */
export const penaltyFocus = (prefix) => (focusGained('penalty', prefix));


/**
 * set focus a input#inputID
 * @param {String} inputID 
 */
export const inputFocus = (inputID) => {
    let el = document.getElementById(`${inputID}`);
    if(el){
        let tagName = el.tagName.toLowerCase();
        document.getElementById(`${inputID}`).focus();
        if(tagName == 'input'){
            document.getElementById(`${inputID}`).select();
        }
    }

}