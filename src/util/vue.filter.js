import { ms_to_string } from './time.util';
import moment from 'moment';

const zero = (new Date(
    (new Date()).getFullYear(),
    (new Date()).getMonth(),
    (new Date()).getDate(),
    0, 0, 0, 0
));

const timeMin = (23*60*60*1000)+(59*60*1000)+(59*1000)+(999);

/**
 * milliseconds to string
 * @param {number} ms 
 */
export const delay = (ms) => {
    return ms_to_string(ms, 'HH:mm')
}

/**
 * start time to string 
 * @param {number} ms 
 */
export const start = (ms) => {
    return moment(ms).format('HH:mm:ss')
}

/**
 * arrival time to string 
 * @param {number} ms 
 */
export const arrival = (ms) => {
    let format =  moment(ms).format('HH:mm:ss,SSS').split(',');

    return `${format[0]},${format[1]/100}`;

}

/**
 * partial time to string 
 * @param {number} ms 
 */
export const partial = (ms) => {
    return arrival((zero.getTime()+ms));        
};

export const penalty = (ms) => {
    return moment((ms+zero.getTime())).format('HH:mm:ss');
};

export const day = (date) => {
    return moment(date).format('MM/DD/YYYY');
}

/**
 * time stamp format
 * @param {number} ms 
 */
export const timestamp = (ms) => {
    return moment(ms).format('MM/DD/YYYY HH:mm:ss,SSS');
}