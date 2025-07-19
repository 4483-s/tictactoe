const gameBoard = (function () {
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
  const setBoardSize = (size) => {
    if (size % 2 === 0 || typeof size !== "number") {
      console.log("Invalid argument, odd numbers only");
      return;
    }
    boardSize = size;
    resetBoard();
  };
  const getBoard = () => board;
  const placeMark = (row, column, mark) => {
    board[row][column] = mark;
  };
  return { getBoard, placeMark, resetBoard, setBoardSize };
})();
function checkWinner(boardArray) {
  const len = boardArray.length;
  function checkSameValue(value, index, thisArr) {
    return value === thisArr[0];
  }
  const diagonalOne = [];
  const diagonalTwo = [];

  for (let i = 0, j = len - 1; i < len; i++, j--) {
    //check if all values in a row are the same recursively
    const checkRowResult = boardArray[i].every(checkSameValue);
    if (checkRowResult && boardArray[i][0]) {
      return boardArray[i][0];
    }
    //check if all value in a column are the same recursively
    const column = [];
    boardArray.forEach((row) => column.push(row[i]));
    const checkColumnResult = column.every(checkSameValue);
    if (checkColumnResult && column[0]) {
      return column[0];
    }
    if (boardArray[i][i]) {
      diagonalOne.push(boardArray[i][i]);
    }
    if (boardArray[j][i]) {
      diagonalTwo.push(boardArray[j][i]);
    }
  }
  if (diagonalOne.every(checkSameValue) && diagonalOne.length === len) {
    return diagonalOne[0];
  }
  if (diagonalTwo.every(checkSameValue) && diagonalTwo.length === len) {
    return diagonalTwo[0];
  }
  // if (
  //   boardArray[0][0] === boardArray[1][1] &&
  //   boardArray[0][0] === boardArray[2][2] &&
  //   boardArray[0][0]
  // ) {
  //   return boardArray[0][0];
  // }
  // if (
  //   boardArray[0][2] === boardArray[1][1] &&
  //   boardArray[2][0] === boardArray[0][2] &&
  //   boardArray[2][0]
  // ) {
  //   return boardArray[0][2];
  // }
  return null;
}
function startGame() {
  let gameStarted = false;
  const players = [
    { name: "Player1", mark: "X" },
    { name: "Player2", mark: "O" },
  ];
  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer.name;
  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const setPlayerName = (playerIndex, newPlayerName) => {
    if (gameStarted) {
      console.log("Cannot rename while playing.");
      return;
    }
    players[playerIndex].name = newPlayerName;
  };
  const playerPlaceMark = (row, column) => {
    gameBoard.placeMark(row, column, activePlayer.mark);
    const checkRowResult = checkWinner(gameBoard());
    switchTurn();
    gameStarted = true;
    if (checkWinnerResult) {
      gameStarted = false;
      const winner = checkRowResult === "X" ? players[0].name : players[1].name;
      console.log(`The winner is ${winner}`);
    }
  };
  return { getActivePlayer, setPlayerName, playerPlaceMark };
}
