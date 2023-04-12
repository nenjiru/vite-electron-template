import '@/styles/style.css'
import typescriptLogo from '@/images/typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter'

if (import.meta.env.DEV)
{
    console.log('Development mode')
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card">
      <button id="dialog" type="button">file dialog</button>
    </div>
  </div>
`
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

document.querySelector('#dialog')!.addEventListener('click', window.api.openDialog)

window.onload = () =>
{
    window.api.on('main-process-message', msg =>
    {
        console.log(msg)
    })
    window.api.on('file-list', list =>
    {
        console.log(list)
    })
}