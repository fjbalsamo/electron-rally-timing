import { ipcMain, dialog } from 'electron';

import {
    ERROR,
    NEW_CATEGORY,
    UPD_CATEGORY,
    DEL_CATEGORY,
    LST_CATEGORY
} from '../channels';

import categoryService from '../sequelize/category.service';


ipcMain.on(NEW_CATEGORY, async (e, args) => {
    try {
        let response = await categoryService.save(JSON.parse(args));

        console.log(response)
        
        e.reply(NEW_CATEGORY, JSON.stringify(response));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(UPD_CATEGORY, async (e, args) => {
    try {
        let response = await categoryService.update(JSON.parse(args));
        
        e.reply(UPD_CATEGORY, JSON.stringify(response));
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(DEL_CATEGORY, async (e, args) => {
    try {
        let btnSelected = await dialog.showMessageBox({
            title: 'Rally Timing',
            message: 'Do you want delete this class?',
            buttons: ['Yes', 'No'],
            defaultId: 1            
        });

        if(btnSelected.response == 0){

            let response = await categoryService.delete(JSON.parse(args));
            
            e.reply(DEL_CATEGORY, JSON.stringify({count:response}));

        }else{
            e.reply(DEL_CATEGORY, JSON.stringify({count:0}));
        }
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(LST_CATEGORY, async (e, args) => {
    try {
        let response = await categoryService.listAll();
        
        e.reply(LST_CATEGORY, JSON.stringify(response));
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

