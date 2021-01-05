import { send } from '../../electon/ipcRenderer';
import {
    DOC_REPORT,
    NEW_REPORT
} from '../../electon/channels';

export default {
    state: {},
    mutations: {},
    actions: {
        createReport: async (context, payload) => {
            let res = await send(NEW_REPORT, payload);
        },
        createDocumentControl: async (context, payload) => {
            let res = await send(DOC_REPORT, payload);
        }
    },
    getters: {}
}