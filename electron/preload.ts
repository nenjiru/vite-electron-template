import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    openDialog: () => ipcRenderer.send('open-dialog'),
    send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
    on: (channel: string, callback: (...args: any[]) => any) =>
    {
        ipcRenderer.on(channel, (_event, args) => callback(args))
    },
})
