import { ActivationFunction } from "./Activation/ActivationFunction.js";
import { SigmoidActivation } from "./Activation/SigmoidActivation.js";
import { Layer } from "./Layer.js";

export class Network {
  layers: Layer[] = [];
  inputLayer: Layer;
  outputLayer: Layer;

  constructor(
    inputs: number,
    outputs: number,
    hiddenLayers: number[],
    public activationFunction: ActivationFunction = new SigmoidActivation()
  ) {
    // Create input layer
    const inputLayer = new Layer(this, null, inputs);
    this.layers.push(inputLayer);
    this.inputLayer = inputLayer;

    // Create hidden layers
    let lastLayer = this.inputLayer;
    hiddenLayers.forEach((neuronCount) => {
      lastLayer = new Layer(this, lastLayer, neuronCount);
      this.layers.push(lastLayer);
    });

    // Create output layer
    const outputLayer = new Layer(this, lastLayer, outputs);
    this.layers.push(outputLayer);
    this.outputLayer = outputLayer;
  }

  feedForward(inputs: number[]) {
    let lastOutput = inputs;

    console.log(inputs);

    for (let i = 1; i < this.layers.length; i++) {
      const layer = this.layers[i];
      const layerOutput: number[] = [];

      for (let j = 0; j < layer.neurons.length; j++) {
        const neuron = layer.neurons[j];

        let weightedSum = 0;
        for (let k = 0; k < neuron.links.length; k++) {
          weightedSum += neuron.links[k].weigth * lastOutput[k];
        }

        const result = this.activationFunction.calculate(
          weightedSum + neuron.bias
        );

        layerOutput.push(result);
      }

      lastOutput = layerOutput;
    }

    return lastOutput;
  }
}
