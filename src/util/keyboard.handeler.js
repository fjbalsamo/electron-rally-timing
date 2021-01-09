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
 * add key event listener to navigate between inputs using enter
 * @param {String} formID 
 */
export const formNavigator = (formName) => {
    const form = document.forms[formName];

    //const inputs = form.getElementsByTagName('input');

    console.log(form);

    if(!(form === undefined)){
        const inputs = form.getElementsByTagName('input');

        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];

            input.addEventListener('keypress', e => {
                if(e.key == 'enter'){
                    console.log(e)
                }
            })
        }
    }
    
}