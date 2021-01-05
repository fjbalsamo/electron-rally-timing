import { send } from '../../electon/ipcRenderer';
import {
    NEW_STAGE,
    UPD_STAGE,
    DEL_STAGE,
    LST_STAGE,
    ONE_STAGE
} from '../../electon/channels';

export default {
    state:{},
    mutations:{},
    actions:{
        newStage: async (context, payload) => {
            return await send(NEW_STAGE, payload);
        },
        updateStage: async (context, payload) => {
            return await send(UPD_STAGE, payload);
        },
        deleteStage: async (context, payload) => {
            return await send(DEL_STAGE, payload);
        },
        listStage: async (context, payload) => {
            return await send(LST_STAGE, payload);
        },
        oneStage: async (context, payload) => {
            return await send(ONE_STAGE, payload);
        },
    },
    getters:{}
}