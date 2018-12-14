import "./styles.css";

const initialGame = {
  players: ["X", "O"],
  currentPlayer: "X",
  boxes: ["", "", "", "", "", "", "", "", ""],
  winner: null,
  winCombos: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]
};

let game = {
  ...initialGame,
  boxes: [...initialGame.boxes]
};

const toggleCurrentPlayer = () => {
  const { players, currentPlayer } = game;
  game.currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
};

const checkWinCondition = () => {
  const { boxes, winCombos, currentPlayer } = game;
  winCombos.forEach(winCombo => {
    if (
      boxes[winCombo[0]] &&
      boxes[winCombo[1]] &&
      boxes[winCombo[2]] &&
      boxes[winCombo[0]] === boxes[winCombo[1]] &&
      boxes[winCombo[1]] === boxes[winCombo[2]]
    ) {
      game.winner = currentPlayer;
    }
  });
};

const renderGame = game => {
  const App = renderBaseBoard();
  renderBoxes();
  renderStatus(App);
  renderRestartButton(App);
};

const renderBaseBoard = () => {
  const App = document.getElementById("app");
  App.innerHTML = `
<div class="container">
</div>
`;
  return App;
};
const renderBoxes = () => {
  const { boxes } = game;
  const container = document.getElementsByClassName("container")[0];

  boxes.forEach((item, i) => {
    const box = document.createElement("div");
    box.innerHTML = item;
    box.id = `box${i}`;
    box.addEventListener("click", () => onBoxClick(item, i));
    container.appendChild(box);
  });
};

const renderRestartButton = App => {
  const restartButton = document.createElement("BUTTON");
  restartButton.addEventListener("click", restart);
  restartButton.id = "restart";
  restartButton.innerHTML = "Restart Game";
  App.appendChild(restartButton);
};
const renderStatus = App => {
  const { currentPlayer, winner } = game;
  const statusBar = document.createElement("div");
  statusBar.id = "statusBar";
  statusBar.innerHTML = `Current Player: ${currentPlayer} <BR> ${
    winner ? `<span class="winner">winner is ${winner} </span>` : ""
  } `;
  App.appendChild(statusBar);
};

const onBoxClick = (item, i) => {
  const { currentPlayer, winner } = game;
  if (!item && !winner) {
    game.boxes[i] = currentPlayer;
    checkWinCondition();
    toggleCurrentPlayer();
    renderGame(game);
  }
};
const restart = () => {
  console.log("restarting...");
  game = {
    ...initialGame,
    boxes: [...initialGame.boxes]
  };
  renderGame(game);
};

renderGame(game);
