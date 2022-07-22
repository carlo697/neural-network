import { drawNeuronalNetwork } from "../Helpers/drawNeuronalNetwork.js";
import { Network } from "../Network.js";

const network = new Network(10, 20, [4, 5, 5,2, 3, 6], true, true);

// const network = new Network(4, 2, [3], true, true, new HyperbolicTangentFunction());

// // const result = network.feedForward([...new Array(4)].map(() => Math.random()));
// const inputs = [0.5, 0, 0, 0];
// console.log("Inputs:", inputs);
// const result = network.feedForward(inputs);
// console.log("Result:", result);

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

function draw() {
  drawNeuronalNetwork(network, canvas);
}

draw();

window.addEventListener("resize", () => {
  draw();
});
