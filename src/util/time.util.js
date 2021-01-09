import moment from 'moment';

/**
 * "hh:mm:ss" (or "hh:mm") to ms 
 * @param {string} hhmmss
 * @returns {number} milliseconds 
 */
export const hhmmss_to_ms = (hhmmss) => {
    //hhmmss => "hh:mm:ss" or "hh:mm"
    let split = hhmmss.split(':');

    let msArray = split.map((v, i) => {
        if(i == 0){ //hours
            return parseInt(v)*60*60*1000;
        }else if(i == 1){ //minutes
            return parseInt(v)*60*1000;
        }else if(i == 2){ //seconds
            return parseInt(v)*1000;
        }else{
            return 0;
        }
    })

    return (msArray.reduce((acc, cv) => acc + cv));
}



/**
 * ms:number to string (momentJS format)
 * @param {number} ms 
 * @param {string} format
 * @returns {string} time
 */
export const ms_to_string = (ms, format) => {
    let day = new Date(1981, 9, 29, 0, 0, 0, ms);
    return moment(day).format(format);
}



/**
 * "hh:mm:ss.dd" to ms:number 
 * @param {string} hhmmssdd
 * @returns {number} milliseconds 
 */
export const hhmmssdd_to_ms = (hhmmssdd) => {
    const first_split = hhmmssdd.split('.');

    let hhmmssToMs = hhmmss_to_ms(first_split[0]);
    let ddToMs = parseInt(first_split[1])*100;

    return hhmmssToMs+ddToMs;

}

/**
 * convert `{hh:number, mm:number, ss}`
 * @param {hh:number, mm:number, ss:number, dd:number} timeObject 
 */
export const timeObject_to_ms = (timeObject) => {
    
    let hh = parseInt(timeObject.hh);
    let mm = parseInt(timeObject.mm);
    let ss = parseInt(timeObject.ss);
    let dd = parseInt(timeObject.dd);



    if(isNaN(hh) || (hh<0) || (hh>23)) return -1;
    
    if(isNaN(mm) || (mm<0) || (mm>59)) return -1;

    if(isNaN(ss) || (ss<0) || (ss>59)) return -1;

    if(isNaN(dd) || (dd<0) || (dd>9)) return -1;

    return (hh*60*60*1000) + (mm*60*1000) + (ss*1000) + (dd*100);
}

/**
 * calculate next star time
 * @param {Array} list 
 */
export const nextStart = (list) => {

    const { ...clone } = list;

    if(list.length==0) return null;

    if(list.length == 1) return list[0].start+(2*60*1000);

    let sort = list.sort((a, b) => (a.start - b.start));


    let last = sort[sort.length-1];
    let beforeLast = sort[sort.length-2];
    let diff = Math.abs(last.start-beforeLast.start);

    return last.start+diff;

}

/**
 * get last items "start" and "arrival"
 * @param {Array} list 
 * @returns {Object}
 */
export const gestLastItem = (list) => {
    let clone = [...list];
    if(list.length>0){

        let start = clone.sort((a, b) => a.start<b.start);  
       
        let arrival = clone.filter(item => item.partial>0)
        .sort((a, b) => a.arrival>b.arrival);

        return {
            start: start[(start.length-1)],
            arrival: arrival[(arrival.length-1)]
        }

    }else{
        return {start: null, arrival: null}
    }

}