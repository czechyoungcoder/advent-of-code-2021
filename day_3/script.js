const fs = require("fs");

const input = fs.readFileSync("input.in", "utf-8").split("\r\n");

const lines = input.length;
const bitsInLine = input[0][0].length;

const part1 = () => {
  let occurencesOfOnes = {};
  for (let i = 0; i < input[0].length; i++) {
    occurencesOfOnes[i] = 0;
  }

  for (let line = 0; line < lines; line++) {
    for (let bit = 0, bits = input[line].length; bit < bits; bit++) {
      const isOne = input[line][bit] === "1";
      if (isOne) occurencesOfOnes[bit]++;
    }
  }

  let gamma = "",
    epsilon = "";
  for (let i in occurencesOfOnes) {
    gamma += occurencesOfOnes[i] > lines / 2 ? "1" : "0";
  }

  epsilon = gamma.replace(/0/g, "2");
  epsilon = epsilon.replace(/1/g, "0");
  epsilon = epsilon.replace(/2/g, "1");

  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  return gamma * epsilon;
};

const part2 = () => {
  function rating(records, mostCommon, idx = 0) {
    const recordsLen = records.length;

    if (recordsLen === 1) return records[0];

    let occurencesOfOnes = 0;
    for (let record = 0; record < recordsLen; record++) {
      if (records[record][idx] === "1") occurencesOfOnes++;
    }

    let common =
      occurencesOfOnes > recordsLen / 2 || occurencesOfOnes === recordsLen / 2
        ? mostCommon
          ? "1"
          : "0"
        : mostCommon
        ? "0"
        : "1";

    const filtered = records.filter((record) => {
      return record[idx] === common;
    });

    return rating(filtered, mostCommon, ++idx);
  }

  const oxygenRating = parseInt(rating(input, true), 2);
  const carbonRating = parseInt(rating(input, false), 2);
  return oxygenRating * carbonRating;
};

console.log(part1(), part2());
