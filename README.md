# Tic-Tac-Toe Game with the Minimax Algorithm

[**Live Demo**](https://xo-game-smoky.vercel.app)

#### Video Demo: https://youtu.be/m7BxCeSFXhU

#### Description:

Welcome to the classic game of Tic-Tac-Toe\! This project is a straightforward yet sophisticated implementation of the timeless game, built using fundamental web technologies: **HTML**, **CSS**, and **JavaScript**. You'll be playing as **X** against a formidable opponent: the computer, who plays as **O**. This isn't just a simple game; it's a deep dive into one of the most foundational concepts in game AI, the **Minimax Algorithm**.

##### Game Rules

- **The Board:** The game is played on a standard 3x3 grid.
- **The Players:** You are Player **X**, and the computer is Player **O**.
- **The Goal:** The objective is simple: be the first to get three of your marks (X or O) in a row, either horizontally, vertically, or diagonally.
- **Game End:** The game concludes in one of two ways:
  - A player successfully gets three marks in a row and wins.
  - All nine squares are filled, and no player has won, resulting in a **draw**.

##### The Brains of the Operation: The Minimax Algorithm

The reason our computer opponent is so tough to beat is the **Minimax Algorithm**. This is a powerful, recursive decision-making algorithm used in two-player games where both players have perfect information (meaning they can see the entire game state).

###### How Minimax Works

At its core, Minimax is designed to choose the optimal move for a player, assuming the opponent is also playing optimally. It works by "looking ahead" through a theoretical tree of all possible future moves and their outcomes.

1.  **Maximizing Player:** The algorithm assumes that the computer (the maximizing player) wants to choose the move that leads to the highest possible score. A win is the best score, a draw is a neutral score, and a loss is the worst score.
2.  **Minimizing Player:** It also assumes that the opponent (you, the minimizing player) will always make the move that leads to the lowest possible score for the computer.
3.  **Recursive Evaluation:** The algorithm recursively explores every possible sequence of moves until it reaches a terminal state (a win, loss, or draw). It then "backpropagates" these scores up the tree.
4.  **Optimal Move Selection:**
    - For the computer's turn, it selects the move that maximizes the minimum score it can get from all the opponent's possible responses.
    - For the human's turn, it assumes the human will choose the move that minimizes the computer's score.

The result is an unbeatable opponent. The computer might seem to "pause" for a moment before making a move, but this is the algorithm calculating every potential scenario, like a grandmaster analyzing a chess board, to ensure it makes the best possible decision and minimizes any chance of a loss. This process guarantees that the computer will either win the game or, at the very least, force a draw.
