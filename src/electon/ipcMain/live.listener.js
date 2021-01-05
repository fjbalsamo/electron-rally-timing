import { ipcMain } from 'electron';
import {
    ERROR,
    CONNECT_LIVE,
    UPD_LIVE
} from '../channels';
import LiveService from '../sequelize/live.service';

ipcMain.on(UPD_LIVE, async (e, args) => {
    try {
        let response = await LiveService.getLiveData(JSON.parse(args))
        
        e.reply(UPD_LIVE, JSON.stringify(response));
    } catch (error) {
        console.error(error);
        e.reply(ERROR, JSON.stringify(error));
    }
})