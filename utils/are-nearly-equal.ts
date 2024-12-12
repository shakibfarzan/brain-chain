const areNearlyEqual = (a: number, b: number, epsilon = 1e-10) =>
  Math.abs(a - b) < epsilon;

export default areNearlyEqual;
