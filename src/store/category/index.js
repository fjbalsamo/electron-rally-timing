import {
    NEW_CATEGORY,
    UPD_CATEGORY,
    DEL_CATEGORY,
    LST_CATEGORY
} from '../../electon/channels';

import {
    send,
    call
} from '../../electon/ipcRenderer';

export default {
    state: {},
    mutations: {},
    actions: {
        newCategory: async (context, payload) => {            
            return await send(NEW_CATEGORY, payload);
        },
        updateCategory: async (context, payload) => {
            return await send(UPD_CATEGORY, payload);
        },
        deleteCategory: async (context, payload) => {
            return await send(DEL_CATEGORY, payload);
        },
        listCategory: async (context) => {
            return await call(LST_CATEGORY);
        },
    },
    getters: {}
}