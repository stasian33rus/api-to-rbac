const ipcRenderer = window.require('electron').ipcRenderer;
const fs = window.require('fs');
const path = window.require('path');

export function pingPong(): void {
    ipcRenderer.send('asynchronous-message', 'ping');
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        const rawdata = fs.readFileSync(path.resolve(arg));
        const file = JSON.parse(rawdata);

        console.log(file);
    });
}
