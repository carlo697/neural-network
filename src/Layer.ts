import { Network } from "./Network.js";
import { Neuron } from "./Neuron.js";

export class Layer {
  network: Network;
  neurons: Neuron[];
  previous: Layer | null;

  constructor(network: Network, previous: Layer | null, neuronCount: number) {
    this.network = network;
    this.previous = previous;
    this.neurons = Array.from({ length: neuronCount }, () => new Neuron(this));
  }
}
