const fs = require("fs");

let input = fs.readFileSync("input.in", "utf-8").split(",").map(Number);
const days = 256;

const fishes = {};

for (let i = 0; i < 9; i++) {
  fishes[i] = 0;
}
for (let fish of input) {
  fishes[fish]++;
}

for (let day = 0; day < days; day++) {
  let oldOnes = fishes[1];
  fishes[1] = fishes[2];
  fishes[2] = fishes[3];
  fishes[3] = fishes[4];
  fishes[4] = fishes[5];
  fishes[5] = fishes[6];
  fishes[6] = fishes[7] + fishes[0];
  fishes[7] = fishes[8];
  fishes[8] = fishes[0];
  fishes[0] = oldOnes;
}

let total = 0;
for (let age in fishes) {
  total += fishes[age];
}

console.log(total);
