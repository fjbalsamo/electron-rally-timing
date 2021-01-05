import { ipcMain, dialog } from 'electron';

import {
    ERROR,
    NEW_STAGE,
    UPD_STAGE,
    DEL_STAGE,
    LST_STAGE,
    ONE_STAGE
} from '../channels';

import stageService from '../sequelize/stage.service';


ipcMain.on(NEW_STAGE, async (e, args) => {
    try {
        
        let res = await stageService.save(JSON.parse(args));

        e.reply(NEW_STAGE, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(UPD_STAGE, async (e, args) => {
    try {
        
        let res = await stageService.update(JSON.parse(args));

        e.reply(UPD_STAGE, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(DEL_STAGE, async (e, args) => {
    try {

        const btnSelected = await dialog.showMessageBox({
            title: 'Rally Timing',
            message: 'Do you want delete this stage?',
            buttons: ['Yes', "No"],
            defaultId: 1
        });

        if(btnSelected.response == 0){

            let res = await stageService.delete(JSON.parse(args));
    
            e.reply(DEL_STAGE, JSON.stringify({count: res}));

        }else{

            e.reply(DEL_STAGE, JSON.stringify({count: 0}));

        }
        

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(LST_STAGE, async (e, args) => {
    try {
        
        let res = await stageService.list(JSON.parse(args));

        e.reply(LST_STAGE, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(ONE_STAGE, async (e, args) => {
    try {
        
        let res = await stageService.one(JSON.parse(args));

        e.reply(ONE_STAGE, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});