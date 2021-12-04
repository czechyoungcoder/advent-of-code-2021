const fs = require("fs");

const input = fs.readFileSync("input.in", "utf-8").split("\r\n");

const part1 = () => {
  const pos = input.reduce(
    (obj, curr) => {
      let [cmd, value] = curr.split(" ");
      value = Number(value);
      switch (cmd) {
        case "forward":
          obj.x += value;
          break;
        case "up":
          obj.depth -= value;
          break;
        case "down":
          obj.depth += value;
      }
      return obj;
    },
    { depth: 0, x: 0 }
  );

  return pos.depth * pos.x;
};

const part2 = () => {
  const pos = input.reduce(
    (obj, curr) => {
      let [cmd, value] = curr.split(" ");
      value = Number(value);
      switch (cmd) {
        case "forward":
          obj.x += value;
          obj.depth += obj.aim * value;
          break;
        case "up":
          obj.aim -= value;
          break;
        case "down":
          obj.aim += value;
      }
      return obj;
    },
    { depth: 0, x: 0, aim: 0 }
  );

  return pos.depth * pos.x;
};

console.log(part1(), part2());
