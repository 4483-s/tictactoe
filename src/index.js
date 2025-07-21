import "./styles.css";
import startGame from "./gamectl.js";
import board from "./board.js";
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
let gamePlaying = false;
const showTurn = () => {
  if (gamePlaying) {
    gameStatusDiv.textContent = `${game.getActivePlayer()[0]}(${game.getActivePlayer()[1]})'s turn`;
  }
};
const hideButtons = () => {
  gamePlaying = true;
  allButtons.forEach((v) => (v.style.display = "none"));
};
const showButtons = () => {
  gamePlaying = false;
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
  showTurn();
});
//
boardDiv.addEventListener("click", (e) => {
  if (!gamePlaying) {
    return;
  }
  const row = e.target.getAttribute("data-row");
  const column = e.target.getAttribute("data-column");
  if (!row || !column) {
    return;
  }
  const result = game.playerPlaceMark(row, column);

  showTurn();
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
