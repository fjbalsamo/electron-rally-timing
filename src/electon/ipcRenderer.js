const { ipcRenderer } = window.electron;
import { ERROR } from './channels';


export const errorListener = () => {
    ipcRenderer.on(ERROR, (e, args) => {
        console.error(JSON.parse(args))
        alert(`error`);
    })
}


/**
 * send args object using an channel
 * @param {string} channel 
 * @param {object} args 
 * @returns {Promise<Object>} Promise<Object>
 */
export const send = (channel, args) => {
    ipcRenderer.send(channel, JSON.stringify(args));

    return new Promise((resolve, reject) => {
        ipcRenderer.on(channel, (e, response) => {
            resolve(JSON.parse(response));
        })
    })
}

/**
 * call a proccess using an channel
 * @param {string} channel 
 * @returns {Promise<Object>} Promise<Object>
 */
export const call = (channel) => {
    ipcRenderer.send(channel, JSON.stringify({}));

    return new Promise((resolve, reject) => {
        ipcRenderer.on(channel, (e, response) => {
            resolve(JSON.parse(response));
        })
    })
}