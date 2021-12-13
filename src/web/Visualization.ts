import { Network } from "../Network.js";

const network = new Network(50, 10, [25, 20, 15, 10, 10]);

// const network = new Network(4, 2, [3]);
// const result = network.feedForward([...Array(4)].map(() => Math.random()));
console.log();

const canvasPadding = 20;
// const layerMargin = 200;
const distributeEvenly = true;
const layerStroke = "rgba(0, 0, 0, 0.2)";
const neuronRadius = 5;
const neuronMargin = 2;
const neuronDiameter = neuronRadius * 2;
const maxNeurons = Math.max(
  ...network.layers.map((layer) => layer.neurons.length)
);

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;
canvas.height =
  maxNeurons * (neuronDiameter + neuronMargin) + canvasPadding * 2;
canvas.width = window.innerWidth;

const layerMargin = canvas.width / network.layers.length - canvasPadding / 2;

context.translate(canvasPadding, canvasPadding);
let lasAvailable = 1;
network.layers.forEach((layer, layerIndex) => {
  context.strokeStyle = layerStroke;

  context.save();

  const available = distributeEvenly
    ? (maxNeurons - 1) / (layer.neurons.length - 1)
    : 1;

  // Draw neurons
  layer.neurons.forEach((neuron, neuronIndex) => {
    context.fillStyle = "gray";

    context.beginPath();
    context.arc(
      0,
      neuronIndex * available * (neuronDiameter + neuronMargin),
      neuronRadius,
      0,
      Math.PI * 2
    );
    context.fill();

    // Draw links
    neuron.links.forEach((link, linkIndex) => {
      context.strokeStyle =
        link.weigth > 0
          ? `rgba(0, 255, 0, ${link.weigth})`
          : `rgba(255, 0, 0, ${link.weigth * -1})`;

      context.beginPath();
      context.moveTo(
        -neuronRadius,
        neuronIndex * available * (neuronDiameter + neuronMargin)
      );
      context.lineTo(
        -layerMargin - neuronRadius,
        linkIndex * lasAvailable * (neuronDiameter + neuronMargin)
      );
      context.stroke();
    });
  });

  lasAvailable = available;

  context.restore();

  // Move to the next layer
  context.translate(neuronDiameter + layerMargin, 0);
});
