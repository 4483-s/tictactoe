const board = [];
let boardSize = 3;
const resetBoard = () => {
  while (board[0]) {
    board.shift();
  }
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push("");
    }
    board.push(row);
  }
};
resetBoard();

const getBoard = () => board;
const placeMark = (row, column, mark) => {
  board[row][column] = mark;
};
export default { getBoard, placeMark, resetBoard };
