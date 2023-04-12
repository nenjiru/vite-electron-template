import * as path from 'path'
import { app, BrowserWindow, ipcMain, dialog } from 'electron'

process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../src/public')

let win: BrowserWindow | null

function createWindow()
{
    win = new BrowserWindow({
        icon: path.join(process.env.PUBLIC, 'logo.svg'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, './preload.js'),
        },
    })

    win.webContents.on('did-finish-load', () =>
    {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    win.once('ready-to-show', () =>
    {
        !app.isPackaged && win?.webContents.openDevTools()
        win?.show()
    })

    if (app.isPackaged)
    {
        win.loadFile(path.join(process.env.DIST, `index.html`))
    }
    else
    {
        win.loadURL(process.env['VITE_DEV_SERVER_URL'])
    }
}

app.on('window-all-closed', () =>
{
    win = null
    app.quit()
})

app.whenReady().then(createWindow)

ipcMain.on('open-dialog', async (_event) =>
{
    const list = await directoryDialog(win!)
    win?.webContents.send('file-list', list)
})

async function directoryDialog(window: BrowserWindow): Promise<string[] | null>
{
    return dialog
        .showOpenDialog(window, {
            properties: ['openFile', 'multiSelections'],
            title: 'Select files',
            filters: [{ name: 'All Files', extensions: ['*'] }]
        })
        .then(async (result) =>
        {
            if (result.canceled)
            {
                return null
            }
            return result.filePaths
        })
}