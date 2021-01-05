import { ipcMain, dialog } from 'electron';

import {
    ERROR,
    NEW_CALENDAR,
    UPD_CALENDAR,
    DEL_CALENDAR,
    LST_CALENDAR,
    UID_CALENDAR
} from '../channels';

import calendarService from '../sequelize/calendar.service';

ipcMain.on(NEW_CALENDAR, async (e, args) => {
    try {
        
        let res = await calendarService.save(JSON.parse(args));

        e.reply(NEW_CALENDAR, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(UPD_CALENDAR, async (e, args) => {
    try {
        
        let res = await calendarService.update(JSON.parse(args));

        e.reply(UPD_CALENDAR, JSON.stringify(res));
        
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(DEL_CALENDAR, async (e, args) => {
    try {
        
        const btnSelect = await dialog.showMessageBox({
            title: 'Rally Timing',
            message: 'Do you want delete this Calendar?',
            buttons: ['Yes', 'No'],
            defaultId: 1           
        });
        
        if(btnSelect.response == 0){

            let res = await calendarService.delete(JSON.parse(args));
    
            e.reply(DEL_CALENDAR, JSON.stringify({count: res}));
            
        }else{

            e.reply(DEL_CALENDAR, JSON.stringify({count: 0}));
            
        }
        
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(LST_CALENDAR, async (e, args) => {
    try {
        
        let res = await calendarService.listAll();

        e.reply(LST_CALENDAR, JSON.stringify(res));
        
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(UID_CALENDAR, async (e, args) => {

    try {

        let res = await calendarService.updateUUID(JSON.parse(args));
    
        e.reply(UID_CALENDAR, JSON.stringify(res));
        
    } catch (error) {
         console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }

})