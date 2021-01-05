import {
    NEW_CALENDAR,
    UPD_CALENDAR,
    DEL_CALENDAR,
    LST_CALENDAR
} from '../../electon/channels';
import { call, send } from '../../electon/ipcRenderer';

export default {
    state: {
        workCalendar: null,
    },
    mutations: {
        SET_WORK_CALENDAR(state, calendar){
            state.workCalendar = calendar;
        }
    },
    actions: {
        newCalendar: async (context, payload) => {
            return await send(NEW_CALENDAR, payload);
        },
        updateCalendar: async (context, payload) => {
            return await send(UPD_CALENDAR, payload);
        },
        deleteCalendar: async (context, payload) => {
            return await send(DEL_CALENDAR, payload);
        },
        listCalendar: async (context) => {
            return await call(LST_CALENDAR);
        },
        setWorkCalendar: ({commit}, payload) => {
            commit('SET_WORK_CALENDAR', payload);
        }        
    },
    getters: {
        getWorkCalendar: (state) => state.workCalendar 
    }
}