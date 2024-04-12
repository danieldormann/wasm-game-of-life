import { Universe, Cell } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const containerNode = document.getElementById('universe-container');
const universe = Universe.new(64, 64);
const width = universe.width();
const height = universe.height();


const renderLoop = () => {
  renderUniverse();
  
  universe.tick();
}

const renderUniverse = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  let renderedUniverse = '';

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const id = getIndex(row, col);
      
      renderedUniverse += cells[id] === Cell.Alive ? '◼' : ' ';
    }

    renderedUniverse += '\n';
  }

  containerNode.textContent = renderedUniverse;
}

const getIndex = (row, col) => {
  return row * width + col;
}

setInterval(renderLoop.bind(this), 1000 / 10);
