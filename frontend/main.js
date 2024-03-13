import './style.css'
import viteLogo from '/soundsculpt.svg'
import { setupCounter } from './counter'
import 'abcjs/abcjs-audio.css';

document.querySelector('#app').innerHTML = `
  <div>
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    <div class="card">
      <button id="generate" type="button">
        Generate
      </button>
    </div>
    <div class="list"></div>
    <div id="paper"></div>

  </div>
`



setupCounter(document.querySelector('#generate'))
