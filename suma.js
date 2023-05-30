import { getNumberA, getNumberB } from "./getNumbers.js";

function suma(a, b) {
  return a + b;
}

function sumAandB() {
  return suma(getNumberA(), getNumberB());
}

export { suma, sumAandB };
