import {
    NEW_CHAMPIONSHIP,
    UPD_CHAMPIONSHIP,
    DEL_CHAMPIONSHIP,
    LST_CHAMPIONSHIP    
} from '../../electon/channels';

import {
    call,
    send
} from '../../electon/ipcRenderer';

export default {
    state: {},
    mutations: {},
    actions: {
        newChampionship: async (context, item) => {
            return await send(NEW_CHAMPIONSHIP, item);
        },
        updateChampionship: async (context, item) => {
            return await send(UPD_CHAMPIONSHIP, item);
        },
        deleteChampionship: async (context, item) => {           
            return await send(DEL_CHAMPIONSHIP, item);
        },
        listChampionship: async (context) => {
            return await call(LST_CHAMPIONSHIP);
        }
    },
    getters:{}
};