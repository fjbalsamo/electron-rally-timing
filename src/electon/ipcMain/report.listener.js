import { ipcMain, BrowserWindow, Menu } from "electron";
import { REPORT_HTML_PATH } from '../../util/file.util';
import { ERROR, NEW_REPORT, DOC_REPORT } from "../channels";
import { htmlHeaders, htmlFooter, parseToHtmlTable, groupedParseToHtmlTable, parseToCSVFormat, groupedParseToCSVFormat, documentControlToCSVFormat } from "../report.parser";
import ReportService from "../sequelize/report.service";
import {
  print,
  exportToPDF,
  screenCapture,
  loadHtmlReport,
  exportToCSV,
} from "../../util/report.file.util";

ipcMain.on(NEW_REPORT, async (e, args) => {
  try {
    const data = JSON.parse(args);

    let formatedResponse = await ReportService.report(data);

    let win = new BrowserWindow({
      width: 800,
      height: 600,
    });

    win.setMenu(
      Menu.buildFromTemplate([
        {
          label: "File",
          submenu: [
            {
              label: "Print",
              accelerator: "Ctrl+P",
              click: () => {
                print(win);
              },
            },
            { type: "separator" },
            {
              label: "Export to PDF",
              accelerator: "Ctrl+Shift+P",
              click: () => {
                exportToPDF(win);
              },
            },
            { type: "separator" },
            {
              label: 'Export to CSV',
              accelerator: 'Ctrl+Shift+X',
              click(){
                exportToCSV(
                  data.groupByCategory 
                  ? groupedParseToCSVFormat(formatedResponse) 
                  : parseToCSVFormat(formatedResponse)
                );
              }
            },
            { type: "separator" },
            {
              label: "Screen Capture",
              accelerator: "Ctrl+Shift+C",
              click: () => {
                screenCapture(win);
              },
            },
          ],
        },
      ])
    );

    let htmlContent = `
      ${htmlHeaders(data)}\n
      ${ data.groupByCategory 
        ?  groupedParseToHtmlTable(formatedResponse) 
        : parseToHtmlTable(formatedResponse)}\n
      ${htmlFooter(data)}  
    `;

    await loadHtmlReport(
        win, 
        htmlContent, 
        REPORT_HTML_PATH
    );

    e.reply(NEW_REPORT, JSON.stringify({ ready: true }));
  } catch (error) {
    console.error(error);
    e.reply(ERROR, JSON.stringify(error));
  }
});


ipcMain.on(DOC_REPORT, async (e, args) => {
  try {
    let response = await ReportService.documentControl(JSON.parse(args));
    
    let documentControl = documentControlToCSVFormat(response);

    await exportToCSV(documentControl);    

  } catch (error) {
    console.error(error);
    e.reply(ERROR, JSON.stringify(error));
  }
})
