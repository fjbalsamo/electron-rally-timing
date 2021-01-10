import os from 'os';
import path from 'path';
import fs from 'fs';
/**
 * Create `rallyTimiming` folder in home dir if not exists
 */
export const createHomeFolder = () => {
    const homePath = path.join(os.homedir(), './.rallyTiming/');

    if(!fs.existsSync(homePath)){
        fs.mkdirSync(homePath)
    }
}

/**
 * SQLite db path
 */
export const SQLITE_DB_PATH = path.join(
    os.homedir(),
    './.rallyTiming/rally.sqlite'
);

/**
 * HTML file Report path
 */
export const REPORT_HTML_PATH = path.join(
    os.homedir(),
    './.rallyTiming/report.html'
);