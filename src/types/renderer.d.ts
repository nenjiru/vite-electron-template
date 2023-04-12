declare global
{
    interface Window
    {
        api: IMainProcess
    }
}

export interface IMainProcess
{
    openDialog: () => void
    send: (channel: string, ...args: any[]) => any
    on: (channel: string, callback: (...args: any[]) => any) => any
}