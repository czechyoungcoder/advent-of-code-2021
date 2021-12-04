const fs = require("fs");

const input = fs.readFileSync("input.in", "utf-8").split("\r\n").map(Number);

const part1 = () => {
  let timesIncreased = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) timesIncreased++;
  }

  return timesIncreased;
};

const part2 = () => {
  let timesIncreased = 0;
  for (let i = 2; i < input.length - 1; i++) {
    let currSection = input[i] + input[i - 1] + input[i + 1];
    let prevSection = input[i] + input[i - 1] + input[i - 2];
    if (currSection > prevSection) timesIncreased++;
  }

  return timesIncreased;
};

console.log(part1(), part2());
