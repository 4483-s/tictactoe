export default function startGame(
  gameBoardGet,
  gameBoardPlaceMark,
  gameBoardReset,
) {
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
  const getActivePlayer = () => [activePlayer.name, activePlayer.mark];
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

      const matchResult = checkWinner(gameBoardGet());
      if (matchResult) {
        matchEnd = true;
        return [
          matchResult === "X" ? players[0].name : players[1].name,
          matchResult,
        ];
      }
      switchTurn();
    }
  };
  const resetGame = () => {
    matchEnd = false;
    gameBoardReset();
  };
  return {
    getActivePlayer,
    setPlayerName,
    playerPlaceMark,
    resetGame,
  };
}
