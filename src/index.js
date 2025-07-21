// import "./styles.css";
// import board from "./board.js";
const board = (function () {
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
  return { getBoard, placeMark, resetBoard };
})();
const dom = (function () {
  const boardDiv = document.querySelector(".board");
  const gameStatusDiv = document.querySelector(".gamestatus");
  const rows = document.querySelectorAll(".rows");
  const startBtn = document.querySelector(".startbtn");
  const setNameBtn = document.querySelector(".setnamebtn");
  const allButtons = document.querySelectorAll("button");
  const cells = document.querySelectorAll(".cells");
  const dialog = document.querySelector("dialog");
  const confirm = document.querySelector(".confirm");
  const cancel = document.querySelector(".cancel");
  const game = startGame(board.getBoard, board.placeMark, board.resetBoard);
  const hideButtons = () => {
    allButtons.forEach((v) => (v.style.display = "none"));
  };
  const showButtons = () => {
    allButtons.forEach((v) => (v.style.display = "inline"));
  };

  rows.forEach((row, rowIndex) => {
    row.querySelectorAll("*").forEach((cell, cellIndex) => {
      cell.setAttribute("data-row", rowIndex);
      cell.setAttribute("data-column", cellIndex);
    });
  });
  //
  startBtn.addEventListener("click", () => {
    game.resetGame();
    cells.forEach((c) => (c.textContent = ""));
    gameStatusDiv.textContent = "";
    hideButtons();
  });
  //
  boardDiv.addEventListener("click", (e) => {
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-column");
    if (!row || !column) {
      return;
    }
    const result = game.playerPlaceMark(row, column);
    e.target.textContent = board.getBoard()[row][column];
    if (result) {
      if (result[1] === "draw") {
        gameStatusDiv.textContent = "Draw";
      } else {
        gameStatusDiv.textContent = `${result[0]}(${result[1]}), wins!`;
      }
      showButtons();
    }
  });
  setNameBtn.addEventListener("click", () => {
    dialog.showModal();
  });
  const resetFrom = () => document.forms[0].reset();
  cancel.addEventListener("click", () => {
    dialog.close();
    resetFrom();
  });
  confirm.addEventListener("click", (e) => {
    e.preventDefault();
    const player1name = document.querySelector("#player1name").value;
    const player2name = document.querySelector("#player2name").value;
    game.setPlayerName(0, player1name);
    game.setPlayerName(1, player2name);
    resetFrom();
    dialog.close();
  });
})();
//
//
//
//
//
function startGame(gameBoardGet, gameBoardPlaceMark, gameBoardReset) {
  function checkWinner(boardArray) {
    const len = boardArray.length;
    function checkSameValue(value, index, thisArr) {
      return value === thisArr[0];
    }
    const diagonalOne = [];
    const diagonalTwo = [];
    for (let i = 0, j = len - 1; i < len; i++, j--) {
      //check if all values in a row are the same
      const checkRowResult = boardArray[i].every(checkSameValue);
      if (checkRowResult && boardArray[i][0]) {
        return boardArray[i][0];
      }
      //check if all value in a column are the same
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
    const flattend = boardArray.flat().every((v) => v);
    if (flattend) {
      return "draw";
    }

    return null;
  }
  let matchEnd = false;
  // let gameStarted = false;
  const players = [
    { name: "Player1", mark: "X" },
    { name: "Player2", mark: "O" },
  ];
  let activePlayer = players[0];
  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const setPlayerName = (playerIndex, newPlayerName) => {
    players[playerIndex].name = newPlayerName;
  };

  const playerPlaceMark = (row, column) => {
    if (matchEnd) {
      return;
    }
    if (!gameBoardGet()[row][column]) {
      gameBoardPlaceMark(row, column, activePlayer.mark);
      switchTurn();

      const checkWinnerResult = checkWinner(gameBoardGet());
      if (checkWinnerResult) {
        matchEnd = true;
        return [
          checkWinnerResult === "X" ? players[0].name : players[1].name,
          checkWinnerResult,
        ];
      }
    }
  };
  const resetGame = () => {
    matchEnd = false;
    gameBoardReset();
  };
  return {
    setPlayerName,
    playerPlaceMark,
    resetGame,
  };
}
