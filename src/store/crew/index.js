import {
    NEW_CREW,
    UPD_CREW,
    DEL_CREW,
    LST_CREW,
    ONE_CREW
} from '../../electon/channels';

import {
    call,
    send
} from '../../electon/ipcRenderer';

export default {
    state: {},
    mutations: {},
    actions: {
        newCrew: async (context, payload) => {
            return await send(NEW_CREW, payload);
        },
        updateCrew: async (context, payload) => {
            return await send(UPD_CREW, payload);
        },
        deleteCrew: async (context, payload) => {
            return await send(DEL_CREW, payload);
        },
        listCrew: async (context) => {
            return await call(LST_CREW);
        },
        oneCrew: async (context, payload) => {
            return await send(ONE_CREW, payload)
        }
    },
    getters: {}
}