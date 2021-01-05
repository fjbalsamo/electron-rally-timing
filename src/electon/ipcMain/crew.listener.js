import { ipcMain, dialog } from 'electron';

import {
    ERROR,
    NEW_CREW,
    UPD_CREW,
    DEL_CREW,
    LST_CREW,
    ONE_CREW
} from '../channels';

import crewService from '../sequelize/crew.service';


ipcMain.on(NEW_CREW, async (e, args) => {
    try {
        
        let res = await crewService.save(JSON.parse(args));
        
        e.reply(NEW_CREW, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(res));
    }
});

ipcMain.on(UPD_CREW, async (e, args) => {
    try {
        
        let res = await crewService.update(JSON.parse(args));
        
        e.reply(UPD_CREW, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(DEL_CREW, async (e, args) => {
    try {
        
        const btnSelected = dialog.showMessageBox({
            title: 'Rally Timing',
            message: 'Do you want delete this crew?',
            buttons: ['Yes', 'No'],
            defaultId: 1
        }); 

        if((await btnSelected).response == 0){
            
            let res = await crewService.delete(JSON.parse(args));
            
            e.reply(DEL_CREW, JSON.stringify({count: res}));

        }else{

            e.reply(DEL_CREW, JSON.stringify({count: 0}));
        }


    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(LST_CREW, async (e, args) => {
    try {
        
        let res = await crewService.listAll();
        
        e.reply(LST_CREW, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(ONE_CREW, async (e, args) => {
    try {
        
        let res = await crewService.findByNumber(JSON.parse(args));
        
        e.reply(ONE_CREW, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

