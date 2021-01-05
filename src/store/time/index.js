import { send } from '../../electon/ipcRenderer';
import {
    START_TIME,
    ARRIVAL_TIME,
    STAGE_TIME,
    DEL_MANY_TIMES,
    DEL_ONE_TIME,
    ASSIGN_TIME,
    NEW_PENALTY,
    DEL_PENALTY,
    HIDDEN_PENALTY,
    HIDDEN_STATUS_PENALTY
} from '../../electon/channels';

export default {
    state:{
        stageTimes: [],
        lastStart: null,
        lastArrival: null,
        lastAssign: null,
    },
    mutations:{
        UPDATE_STAGE_TIMES(state, data){
            state.stageTimes = data;
        },
        UPDATE_LAST_START(state, data){
            state.lastStart = data;
        },
        UPDATE_LAST_ARRIVAL(state, data){
            state.lastStart = data;
        }
    },
    actions:{
        updateStageList: async (context, payload) => { //payload={stage_id:number}
            let res = await send(STAGE_TIME, payload);
            context.commit('UPDATE_STAGE_TIMES', res);            
        },
        startTime: async (context, payload) => {
            let res = await send(START_TIME, payload);
            await context.dispatch('updateStageList', {stage_id: payload.stage.id});
            context.commit('UPDATE_LAST_START', payload);
            context.commit('TRANSMIT', null, {root: true});
            return res;
        },
        arrivalTime: async (context, payload) => {
            let res = await send(ARRIVAL_TIME, payload);
            await context.dispatch('updateStageList', {stage_id: payload.stage.id})
            context.commit('TRANSMIT', null, {root: true});
            return res;
        },
        assignTime: async (context, payload) => {
            let res = await send(ASSIGN_TIME, payload);
            await context.dispatch('updateStageList', {stage_id: payload.stage.id})
            context.commit('TRANSMIT', null, {root: true});
            return res;
        },
        addPenalty: async (context, payload) => {
            let res = await send(NEW_PENALTY, payload); 
            await context.dispatch('updateStageList', {stage_id: payload.stage.id})
            context.commit('TRANSMIT', null, {root: true});
            return res;
        },
        delPenalty: async (context, payload) => {
            let res = await send(DEL_PENALTY, payload); 
            await context.dispatch('updateStageList', {stage_id: payload.stage_id})
            context.commit('TRANSMIT', null, {root: true});
            return res;
        },
        hiddenTimeList: async (context, payload) => {
            let res = await send(HIDDEN_PENALTY, payload);
            return res;
        },
        hiddenTimeStatus: async (context, payload) => {
            let res = await send(HIDDEN_STATUS_PENALTY, payload);
            context.commit('TRANSMIT', null, {root: true});
            return res
        },
        deleteTime: async (context, payload) => {
            let res = await send(DEL_ONE_TIME, payload);
            await context.dispatch('updateStageList', {stage_id: payload.stage_id});
            context.commit('TRANSMIT', null, {root: true});
        },
        deleteStageTimes: async (context, payload) => {
            let res = await send(DEL_MANY_TIMES, payload);
            await context.dispatch('updateStageList', {stage_id: payload.stage_id});
            context.commit('TRANSMIT', null, {root: true});
        },

    },
    getters: {
        getStageTimes: (state) => state.stageTimes,
        getLastStart: (state) => state.lastStart,
        getLastArrival: (state) => state.lastArrival,
        getLastAssign: (state) => state.lastAssign
    }
}