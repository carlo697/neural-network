import { Layer } from "./Layer.js";
import { Link } from "./Link.js";

export class Neuron {
  layer: Layer;
  links: Link[] = [];
  bias: number;

  constructor(layer: Layer, bias: number | undefined = undefined) {
    this.layer = layer;
    this.bias = bias ?? Math.random() * 2 - 1;

    // Get previous neurons
    const previousNeurons = layer.previous?.neurons;
    // Create links if the layer exists
    previousNeurons?.forEach((neuron) => {
      const weigth = Math.random() * 2 - 1;
      this.links.push(new Link(neuron, this, weigth));
    });
  }
}
