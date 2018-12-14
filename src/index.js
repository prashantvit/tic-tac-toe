import "./styles.css";

const game = {
  players: ["X", "O"],
  currentPlayer: "X",
  boxes: ["", "", "", "", "", "", "", "", ""]
};

const toggleCurrentPlayer = () => {
  const { players, currentPlayer } = game;
  game.currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
};

const onBoxClick = (item, i) => {
  if (!item) {
    const { currentPlayer } = game;
    game.boxes[i] = currentPlayer;
    toggleCurrentPlayer();
    renderBaseBoard(game);
  }
};
const renderBaseBoard = game => {
  const { boxes, currentPlayer } = game;
  const App = document.getElementById("app");
  App.innerHTML = `
<div class="container">
</div>
`;
  const container = document.getElementsByClassName("container")[0];
  boxes.forEach((item, i) => {
    const box = document.createElement("div");
    box.innerHTML = item;
    box.id = `box${i}`;
    box.addEventListener("click", () => onBoxClick(item, i));
    container.appendChild(box);
  });
  const statusBar = document.createElement("div");
  statusBar.id = "statusBar";
  statusBar.innerHTML = `Current Player: ${currentPlayer}`;
  App.appendChild(statusBar);
};

renderBaseBoard(game);
