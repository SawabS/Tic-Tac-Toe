document.addEventListener('DOMContentLoaded', () => {
    const ticTacToe = document.getElementById('ticTacToe');
    const scoreXElement = document.getElementById('scoreX');
    const scoreOElement = document.getElementById('scoreO');
    const currentPlayerElement = document.getElementById('currentPlayer');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;

    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]			 // Diagonals
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true;
        }
      }
      return false;
    }

    function checkTie() {
      return !board.includes('');
    }

    function handleClick(index) {
      if (!gameActive || board[index] !== '') return;

      board[index] = currentPlayer;
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = currentPlayer;

      const playerClass = currentPlayer === 'X' ? 'playerX' : 'playerO';
      const playerElement = document.createElement('div');
      playerElement.classList.add(playerClass);
      playerElement.textContent = currentPlayer;
      cell.appendChild(playerElement);

      ticTacToe.replaceChild(cell, ticTacToe.children[index]);

      if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        currentPlayer === 'X' ? scoreX++ : scoreO++;
        updateScore();
        resetGame();
      } else if (checkTie()) {
        alert('It\'s a tie!');
        resetGame();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateCurrentPlayerText();
      }
    }

    function resetGame() {
      gameActive = false;
      setTimeout(() => {
        ticTacToe.innerHTML = '';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        renderBoard();
        updateCurrentPlayerText();
      }, 1000);
    }

    function updateScore() {
      scoreXElement.textContent = scoreX;
      scoreOElement.textContent = scoreO;
    }

    function updateCurrentPlayerText() {
      currentPlayerElement.textContent = `Current Player: ${currentPlayer}`;
      currentPlayerElement.classList.toggle('activePlayer');
      setTimeout(() => {
        currentPlayerElement.classList.toggle('activePlayer');
      }, 500);
    }

    function renderBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleClick(i));
        ticTacToe.appendChild(cell);
      }
    }

    renderBoard();
    updateCurrentPlayerText();
  });