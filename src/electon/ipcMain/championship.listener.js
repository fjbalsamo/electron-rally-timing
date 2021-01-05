import { ipcMain, dialog } from 'electron';

import championshipService from '../sequelize/championship.service';

import {
    ERROR,
    NEW_CHAMPIONSHIP,
    LST_CHAMPIONSHIP,
    UPD_CHAMPIONSHIP,
    DEL_CHAMPIONSHIP
} from '../channels';

ipcMain.on(NEW_CHAMPIONSHIP, async (e, args) => {
    try {
        const res = await championshipService.save(JSON.parse(args));
        e.reply(NEW_CHAMPIONSHIP, JSON.stringify(res))
    } catch (error) {
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(UPD_CHAMPIONSHIP, async (e, args) => {
    try {
        const res = await championshipService.update(JSON.parse(args));
        e.reply(UPD_CHAMPIONSHIP, JSON.stringify(res))
    } catch (error) {
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(DEL_CHAMPIONSHIP, async (e, args) => {
    try {
        let btnSelected = await dialog.showMessageBox({
            title: 'Rally Timing',
            message: 'Do you want delete this championship?',
            buttons: ['Yes', 'No'],
            defaultId: 1
        });

        if(btnSelected.response == 0){
            console.log(JSON.parse(args));
            const res = await championshipService.delete(JSON.parse(args));
            e.reply(DEL_CHAMPIONSHIP, JSON.stringify({count: res}))
        }else{
            e.reply(DEL_CHAMPIONSHIP, JSON.stringify({count: 0}))
        }
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});


ipcMain.on(LST_CHAMPIONSHIP, async (e, args) => {
    try {
        const res = await championshipService.listAll();
        e.reply(LST_CHAMPIONSHIP, JSON.stringify(res))
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});