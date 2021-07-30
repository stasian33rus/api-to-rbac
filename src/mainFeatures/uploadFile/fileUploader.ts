import { BrowserWindow, dialog, ipcMain } from 'electron';

export const createChildWindow = (): void => {
    const childWindow = new BrowserWindow();
    console.log(childWindow);
    return undefined;
};

export const fileUploader = ipcMain.handle('home@upload-file/request', async (event, arg) => {
    await dialog
        .showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'выберите Open API файл', extensions: ['json', 'yaml'] }],
        })
        .then((obj) => {
            if (obj === undefined) {
                return;
            }
            console.log(arg, 'arg');
            // event.reply('home@upload-file/reply', obj.filePaths[0]);
        });
});
