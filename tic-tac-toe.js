document.addEventListener("DOMContentLoaded", function() {
    const playerVsPlayerBtn = document.getElementById('playerVsPlayerBtn');
    const playerVsAIBtn = document.getElementById('playerVsAIBtn');
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer;
    let gameActive = false;
    let modeAI = false;

    playerVsPlayerBtn.addEventListener('click', function() {
        startGame(false);
    });

    playerVsAIBtn.addEventListener('click', function() {
        startGame(true);
    });

    function startGame(isAgainstAI) {
        modeAI = isAgainstAI;
        gameActive = true;
        currentPlayer = 'X';
        resetButton.style.display = 'inline-block';

        gameBoard.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        if (!gameActive) return;

        const clickedCellIndex = parseInt(event.target.getAttribute('data-index'));
        const cells = document.querySelectorAll('.cell');

        if (!cells[clickedCellIndex].textContent) {
            cells[clickedCellIndex].textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                endGame(currentPlayer + ' wins!');
            } else if (checkDraw()) {
                endGame('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (modeAI && currentPlayer === 'O') {
                    makeAIMove();
                }
            }
        }
    }

    function makeAIMove() {
        const cells = document.querySelectorAll('.cell');
        const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = 'O';

        if (checkWin('O')) {
            endGame('AI wins!');
        } else if (checkDraw()) {
            endGame('It\'s a draw!');
        } else {
            currentPlayer = 'X';
        }
    }

    function checkWin(player) {
        const cells = document.querySelectorAll('.cell');
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombos.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    }

    function checkDraw() {
        const cells = document.querySelectorAll('.cell');
        return Array.from(cells).every(cell => cell.textContent !== '');
    }

    function endGame(message) {
        gameActive = false;
        alert(message);

        playerVsPlayerBtn.style.display = 'inline-block';
        playerVsPlayerBtn.style.cursor= pointer;
        playerVsPlayerBtn.style.backgroundColor = 'rgb(47, 46, 134)';
        playerVsPlayerBtn.style.border = '2px solid rgb(47, 46, 134)';
        playerVsPlayerBtn.style.color = 'white';
        playerVsPlayerBtn.style.transition = 'background-color 0.3s';
        playerVsPlayerBtn.style.hover.backgroundColor = 'white';
        playerVsPlayerBtn.style.hover.color = 'rgb(47, 46, 134)';

        playerVsAIBtn.style.display = 'inline-block';
        playerVsAIBtn.style.cursor= pointer;
        playerVsAIBtn.style.backgroundColor = 'rgb(47, 46, 134)';
        playerVsAIBtn.style.border = '2px solid rgb(47, 46, 134)';
        playerVsAIBtn.style.color = 'white';
        playerVsAIBtn.style.transition = 'background-color 0.3s';
        playerVsAIBtn.style.hover.backgroundColor = 'white';
        playerVsAIBtn.style.hover.color = 'rgb(47, 46, 134)';
    }

    resetButton.addEventListener('click', function() {
        gameActive = false;
        currentPlayer = 'X';
        resetButton.style.display = 'none';
        startGame(modeAI);
    });
});
