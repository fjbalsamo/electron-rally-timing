import { 
    UPD_LIVE,
    UID_CALENDAR
 } from '../../electon/channels';
import { send } from '../../electon/ipcRenderer';
import { calendars } from '../../firebase';

export default {
    state: {
        online: false,
        transmissionCount: 0,
        transmitCalendar: null,
    },
    mutations: {
        TOGGLE_ON_LINE(state, calendar){
            state.online = !state.online;
            state.transmitCalendar = calendar;
        },
        TRANSMIT(state){
            if(state.online){
                send(UPD_LIVE, state.transmitCalendar).then(res =>{
                   if(!res.error){
                       calendars.child(res.calendar.uuid).update(res)
                       .then(ok => {
                           state.transmissionCount +=1; 
                       })
                       .catch(error => {
                           console.error(error)
                       })
                   }
                }).catch(err => {
                    console.error(err);
                })
            }
        }

    },
    actions: {
        toggleOnline: async (context) => {
            let calendar = context.rootState.calendar.workCalendar

            let doc = await calendars.child(calendar.uuid).get();

            if(!doc.exists()){
                let push = await calendars.push(calendar);
                await send(UID_CALENDAR, {
                    id: calendar.id,
                    uuid: push.key
                })

                let newCalendar = {
                    ...calendar,
                    uuid: push.key
                }

                context.commit('SET_WORK_CALENDAR', newCalendar, {root: true});

                context.commit('TOGGLE_ON_LINE', newCalendar);
                
            }else{
                context.commit('TOGGLE_ON_LINE', calendar);
            }
            

        },
        throwUpdate: (context) => {
            context.commit('ADD_TRANSMISSION')
        },
        
        saveFireStoreCalendar: async (context, payload) => {
            let doc = await calendars.child(payload.uuid).get();

            if(!doc.exists){
                let push = await calendars.push(payload);                
                context.commit('TOGGLE_ON_LINE', push);
            }else{
                return doc;
            }
        }
    },
    getters: {
        isOnline: (state) => state.online,
        getTransmissionCount: (state) => state.transmissionCount
    }
}