import { Universe } from "wasm-game-of-life";

const universe = Universe.new();
const containerNode = document.getElementById('universe-container');

const renderLoop = () => {
  containerNode.textContent = universe.render();

  universe.tick();

  requestAnimationFrame(renderLoop);
}

requestAnimationFrame(renderLoop);
