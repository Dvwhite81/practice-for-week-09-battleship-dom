import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
window.addEventListener("DOMContentLoaded", event => {
    createYouWin();
    createReset();
    renderBoard();
});

const createYouWin = () => {
    const youWin = document.createElement("h2");
    youWin.setAttribute("id", "you-win");
    youWin.style.display = "none";
    youWin.textContent = "YOU WIN!";
    document.body.append(youWin);
}

const renderBoard = () => {

    const gameBoardContainer = document.createElement("div");
    gameBoardContainer.setAttribute("id", "gameBoardContainer");

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.setAttribute("data-row", i);
            square.setAttribute("data-col", j);
            square.style.top = `${j * 50}px`;
            square.style.left = `${i * 50}px`;
            gameBoardContainer.appendChild(square);
        }
    }
    gameBoardContainer.addEventListener("click", checkForHit);

    document.body.appendChild(gameBoardContainer);
}

const createReset = () => {
    const resetButton = document.createElement("button");
    resetButton.setAttribute("id", "reset-button");
    resetButton.innerText = "Reset Game";
    resetButton.addEventListener("click", event => {
        board = new Board();
        const youWin = document.getElementById("you-win");
        youWin.style.display = "none";
        gameBoardContainer.remove();
        renderBoard();
    });
    document.body.append(resetButton);
}

const checkForHit = (event) => {
    const space = event.target;
    const row = space.dataset.row;
    const col = space.dataset.col;
    const hit = board.makeHit(row, col);

    if (hit) {
        space.classList.add("hit");
        space.innerText = board.grid[row][col];
    } else {
        space.classList.add("miss");
    }

    if (board.isGameOver()) {
        gameBoardContainer.removeEventListener("click", checkForHit);

        const youWin = document.getElementById("you-win");
        youWin.style.display = "block";
    }
}
