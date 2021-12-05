const fs = require("fs");
const input = fs.readFileSync("input.in", "utf-8").trim().split("\r\n");

const winning = input[0].split(",");
let boards = [];
for (let line = 1; line < input.length; line++) {
  if (input[line] == "") boards.push([]);
  else {
    boards[boards.length - 1].push(
      input[line]
        .split(" ")
        .filter((x) => x != "")
        .map(Number)
    );
  }
}

const boardSize = boards[0].length;
let bingosOrder = new Set();
let lastBingoBoard;
let lastNumber;

let numbers = {};
for (let board = 0, len = boards.length; board < len; board++) {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const num = boards[board][row][col];
      if (numbers[num]) numbers[num].push([board, row, col]);
      else numbers[num] = [[board, row, col]];
    }
  }
}

function isBingo(b, r, c) {
  let foundWon = 0;
  for (let x = 0; x < boardSize; x++) {
    if (boards[b][r][x] == "X") foundWon++;
  }
  if (foundWon == boardSize) return b;
  foundWon = 0;
  for (let y = 0; y < boardSize; y++) {
    if (boards[b][y][c] == "X") foundWon++;
  }
  if (foundWon == boardSize) return b;
}

function search(pos) {
  const [board, row, col] = [...pos];
  const bingoBoard = isBingo(board, row, col);
  if (bingoBoard != undefined) return bingoBoard;
}

let searching = true;
for (let i = 0; i < winning.length; i++) {
  if (!searching) break;

  const boardsArr = numbers[winning[i]];
  if (boardsArr) {
    for (let board = 0; board < boardsArr.length; board++) {
      const [b, r, c] = boardsArr[board];
      boards[b][r][c] = "X";
      bingoBoard = search(boardsArr[board]);
      if (bingoBoard != undefined) {
        bingosOrder.add(bingoBoard);
        if (bingosOrder.size === boards.length) {
          searching = false;
          lastNumber = winning[i];
          break;
        }
      }
    }
  }
}

let sumOfUnmarked = 0;
for (let row = 0; row < boardSize; row++) {
  for (let col = 0; col < boardSize; col++) {
    const num = boards[bingoBoard][row][col];
    sumOfUnmarked += num !== "X" ? num : 0;
  }
}

console.log(sumOfUnmarked * lastNumber);
