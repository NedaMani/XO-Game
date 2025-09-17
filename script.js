const statusDisplay = document.querySelector(".game--status");

// Score for each position for the AI to make the best decision
const scores = {
  X: -1, // If the opponent wins
  O: 1, // If the AI wins
  tie: 0, // If it's a tie
};

// Initial state
const initialState = {
  currentPlayer: "X",
  gameActive: true,
};

// Game cells
let gameState = new Array(9).fill("");

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = initialState.currentPlayer;
  clickedCell.innerHTML = initialState.currentPlayer;
}

function handlePlayerChange() {
  initialState.currentPlayer = initialState.currentPlayer === "X" ? "O" : "X";
  if (initialState.currentPlayer === "O" && initialState.gameActive) {
    bestMove();
  }
}

function handleResultValidation() {
  if (checkWinner() === "X" || checkWinner() === "O") {
    statusDisplay.innerHTML = `Player ${initialState.currentPlayer} has won!`;
    initialState.gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = "Game ended in a draw!";
    initialState.gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !initialState.gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  initialState.gameActive = true;
  initialState.currentPlayer = "X";
  gameState.fill("");
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  statusDisplay.innerHTML = "What is your move?";
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);

// Find and select the best move for O
function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    // Get the empty cells and check each one to select the one that brings the highest score
    if (gameState[i] === "") {
      gameState[i] = "O";
      let score = minimax(gameState, 0, false);
      gameState[i] = "";
      // Select the cell that brings the highest score
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  gameState[move] = "O";
  document.querySelector(`[data-cell-index="${move}"]`).innerHTML = "O";
  handleResultValidation();
}

// Algorithm to check all game possibilities
function minimax(board, depth, isMaximizing) {
  let winner = null;

  // Sends the score to the upper layer
  if ((winner = checkWinner())) {
    return scores[winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      // Is the cell empty?
      if (board[i] === "") {
        // If O is placed in that empty space, how will the flow proceed?
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        // O winning is equivalent to a higher score for O
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      // Is the cell empty?
      if (board[i] === "") {
        // If X is placed in that empty space, how will the flow proceed?
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        // X winning is equivalent to a lower score for O
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinner() {
  let winner = null;

  // Check horizontal win
  for (let i = 0; i < 9; i += 3) {
    if (
      gameState[i] === gameState[i + 1] &&
      gameState[i + 1] === gameState[i + 2] &&
      gameState[i] !== ""
    ) {
      winner = gameState[i];
    }
  }

  // Check vertical win
  for (let i = 0; i < 3; i++) {
    if (
      gameState[i] === gameState[i + 3] &&
      gameState[i + 3] === gameState[i + 6] &&
      gameState[i] !== ""
    ) {
      winner = gameState[i];
    }
  }

  // Check diagonal win
  if (
    gameState[0] === gameState[4] &&
    gameState[4] === gameState[8] &&
    gameState[0] !== ""
  ) {
    winner = gameState[0];
  }
  if (
    gameState[2] === gameState[4] &&
    gameState[4] === gameState[6] &&
    gameState[2] !== ""
  ) {
    winner = gameState[2];
  }

  // Count empty cells
  let openSpots = 0;
  for (let i = 0; i < 9; i++) {
    if (gameState[i] === "") {
      openSpots++;
    }
  }

  // Check for a tie and return the winning player
  if (winner === null && openSpots === 0) {
    return "tie";
  } else {
    return winner;
  }
}
