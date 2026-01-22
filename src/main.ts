import { setupCounter } from './counter.ts';
import { DATA_SIMPLE_GRAPH } from './data/simple.ts';
import './style.css';
import typescriptLogo from './typescript.svg';
import { parseGml } from './util/GraphParser.ts';
import viteLogo from '/vite.svg';

const graph = parseGml(DATA_SIMPLE_GRAPH);

console.log(graph);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
