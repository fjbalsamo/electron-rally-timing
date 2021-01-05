import { ipcMain, dialog } from 'electron';
import TimeService from '../sequelize/time.service';
import {
    ERROR,
    START_TIME,
    ARRIVAL_TIME,
    ASSIGN_TIME,
    DEL_ONE_TIME,
    DEL_MANY_TIMES,
    STAGE_TIME
} from '../channels';


ipcMain.on(START_TIME, async (e, args) => {
    
    try {
        let res = await TimeService.start(JSON.parse(args));
        e.reply(START_TIME, JSON.stringify(res));
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }

})


ipcMain.on(ARRIVAL_TIME, async (e, args) => {
    try {
        
        let res = await TimeService.arrival(JSON.parse(args));

        
        
        e.reply(ARRIVAL_TIME, JSON.stringify(res));

        

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(ASSIGN_TIME, async (e, args) => {
    try {
        let res = await TimeService.assign(JSON.parse(args));
        e.reply(ASSIGN_TIME, JSON.stringify(res));
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
})


ipcMain.on(STAGE_TIME, async (e, args) => {
    
    try {
        let res = await TimeService.stageTimes(JSON.parse(args));
        e.reply(STAGE_TIME, JSON.stringify(res));
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
})

ipcMain.on(DEL_ONE_TIME, async (e, args) => {
    try {
        const btnSelected = await dialog.showMessageBox({
            title: 'Rally Timing',
            message: 'Do you want delete this time register?',
            buttons: ['Yes', 'No'],
            defaultId: 1
        });

        if(btnSelected.response == 0){
            let res = await TimeService.deleteOne(JSON.parse(args));

            e.reply(DEL_ONE_TIME, JSON.stringify({count: res}))
        }else{
            e.reply(DEL_ONE_TIME, JSON.stringify({count: 0}))
        }

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(DEL_MANY_TIMES, async (e, args) => {
    try {
        const btnSelected = await dialog.showMessageBox({
            title: 'Rally Timing',
            message: 'Do you want delete all times register of this stage?',
            buttons: ['Yes', 'No'],
            defaultId: 1
        });

        if(btnSelected.response == 0){
            let res = await TimeService.deleteMany(JSON.parse(args));

            e.reply(DEL_MANY_TIMES, JSON.stringify({count: res}))
        }else{
            e.reply(DEL_MANY_TIMES, JSON.stringify({count: 0}))
        }

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});