export interface ActivationFunction {
  calculate(value: number): number;

  derivative(value: number): number;
}
