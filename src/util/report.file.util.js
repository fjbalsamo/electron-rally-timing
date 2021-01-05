import { dialog, Notification } from 'electron';
import moment from 'moment';
import fs from 'fs';
import path from 'path';

const timestamp = () => moment().format('YYYY-MM-DD-HH-mm-ss');

/**
 * create and load html file
 * @param {BrowserWindow} win 
 * @param {String} htmlContent 
 * @param {String} filePath 
 */
export const loadHtmlReport = async (win, htmlContent, filePath) => {
    fs.writeFile(filePath, htmlContent, async (err) => {
        if(err) throw new Error(err.toString());
        await win.loadFile(filePath);
    })
};

/**
 * export html content to pdf
 *  @param {BrowserWindow} win
 */
export const exportToPDF = async (win) => {
    let showOpenDialog = await dialog.showOpenDialog(win, {
        properties: ["openDirectory"],
    });

    if(showOpenDialog.filePaths.length==1){
        win.webContents
        .printToPDF({
            marginsType: 2,
            pageSize: "A4",
            printBackground: true,
            printSelectionOnly: false,
            landscape: false,
        }).then(result => {
            fs.writeFile(
                path.join(showOpenDialog.filePaths[0],
                `./${timestamp()}_report.pdf`),
                result,
                err => {
                    if(err) throw new Error(err.toString());
                    (new Notification({
                        title: 'Rally Timing',
                        body: `pdf report created`
                    })).show();
                }
            )
        });
    }
    
}

/**
 * send html document to print
 * @param {BrowserWindow} win
 */
export const print = async (win) => {
    win.webContents.print(
      {
        silent: false,
        printBackground: true,
        color: false,
        margin: {
          marginType: 2,
        },
        landscape: false,
        pagesPerSheet: 1,
        collate: false,
        copies: 1,
      },
      (success, failureReason) => {
        if (!success) throw new Error(failureReason);
      }
    );
  };


 /**
 * export html content to pdf
 *  @param {BrowserWindow} win
 */
export const screenCapture = async (win) => {
    let showOpenDialog = await dialog.showOpenDialog(win, {
        properties: ["openDirectory"],
    });

    if(showOpenDialog.filePaths.length==1){
        
        win.capturePage(img => {
            fs.writeFile(
                path.join(showOpenDialog[0], `${timestamp()}_screen_capture.png`), 
                img.toPng(), 
                err => {
                    if(err) throw new Error(err.toString());
    
                    (new Notification({
                        title: 'Rally Timing',
                        body: `screen capture saved`
                    })).show();
    
            });

        });

    }
    
}

/**
 * create csv file
 * @param {[string]} data 
 */
export const exportToCSV = async (data) => {
    
    let showOpenDialog = await dialog.showOpenDialog({
        properties: ["openDirectory"],
    });

    if(showOpenDialog.filePaths.length == 1) {
        fs.writeFile(
            path.join(showOpenDialog.filePaths[0], `${timestamp()}_report.csv`), 
            data, 
            err => {
                if(err) throw new Error(err.toString());

                (new Notification({
                    title: 'Rally Timing',
                    body: `csv report saved`
                })).show();

        })
    }
    
}