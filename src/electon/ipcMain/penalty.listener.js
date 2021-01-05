import { ipcMain } from 'electron';
import {
    ERROR,
    NEW_PENALTY,
    DEL_PENALTY,
    HIDDEN_PENALTY,
    HIDDEN_STATUS_PENALTY
} from '../channels';
import PenaltyService from '../sequelize/penalty.service';


ipcMain.on(NEW_PENALTY, async (e, args) => {
    try {
        
        let res = await PenaltyService.save(JSON.parse(args));
        
        e.reply(NEW_PENALTY, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
})


ipcMain.on(DEL_PENALTY, async (e, args) => {
    try {
        
        let res = await PenaltyService.remove(JSON.parse(args));
        
        e.reply(DEL_PENALTY, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
});

ipcMain.on(HIDDEN_PENALTY, async (e, args) => {
    try {
        
        let res = await PenaltyService.hideTimeList(JSON.parse(args));

        e.reply(HIDDEN_PENALTY, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
})

ipcMain.on(HIDDEN_STATUS_PENALTY, async (e, args) => {
    try {
        let res = await PenaltyService.changeHideStatus(JSON.parse(args));

        e.reply(HIDDEN_STATUS_PENALTY, JSON.stringify(res));

    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
})
