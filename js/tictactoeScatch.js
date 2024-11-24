const startGameButton = document.getElementById('start-game');

const aiMessages = {
    start: "I'll let you go first. Choose wisely...",
    playerMove: [
        "Interesting choice...",
        "Is that the best you can do?",
        "Hmm, I saw that coming.",
        "Playing it safe, aren't we?"
    ],
    aiWin: [
        "As expected, I win again!",
        "You never stood a chance!",
        "Maybe try playing tic-tac-toe with a human?",
        "Too easy! Want to try again?"
    ],
    playerWin: [
        "Impossible! There must be a bug...",
        "You... won? How?!",
        "This has never happened before!"
    ],
    tie: [
        "A tie? You're better than most humans.",
        "Not bad, but you still can't beat me!",
        "Stalemate this time, but I won't let it happen again."
    ]
};

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let humanScore = 0;
let aiScore = 0;
let ai = 'AI';
let human = 'Player'
let currentPlayer = human;
let isHumanFirst = true;

function createBoard() {
    const container = document.getElementById('tictactoe-container');
    container.innerHTML = '';

    const messageDisplay = document.createElement('div');
    messageDisplay.id = 'ai-message';
    messageDisplay.className = 'ai-message';
    messageDisplay.textContent = aiMessages.start;
    container.appendChild(messageDisplay);


    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
             const cell = document.createElement('div');
             cell.className = 'grid-cell';
             cell.dataset.row = i;
             cell.dataset.col = j;
             cell.addEventListener('click', handleCellClick);
             gridContainer.appendChild(cell);
        }
    }

    container.appendChild(gridContainer); 
}

function displayAIMessage(messageType) {
    const messageDisplay = document.getElementById('ai-message');
    if (!messageDisplay) return;

    let messages;
    switch(messageType) {
        case 'playerMove':
            messages = aiMessages.playerMove;
            break;
        case 'aiWin':
            messages = aiMessages.aiWin;
            break;
        case 'playerWin':
            messages = aiMessages.playerWin;
            break;
        case 'tie':
            messages = aiMessages.tie;
            break;
        default:
            messages = [aiMessages.start];
    }
    
    messageDisplay.textContent = messages[Math.floor(Math.random() * messages.length)];
}

function handleCellClick(event) {
    if (currentPlayer === human) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);

        if (board[row][col] === '') {
            makeMove(row, col, human);
            displayAIMessage('playerMove');
            currentPlayer = ai;
            setTimeout(bestMove, 1000);
        }
    }
}

function makeMove(row, col, player) {
    board[row][col] = player;
    updateDisplay();

    const result = checkWinner();
    if (result !== null) {
        handleGameEnd(result);
    }

}

function updateDisplay() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        const value = board[row][col];
        cell.textContent = value === 'AI' ? 'X' : value === 'Player' ? 'O' : '';
        cell.className = `grid-cell ${value ? 'filled' : ''}`;
    });

}

function checkWinner() {
    
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
        }
    }

    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                openSpots++;
            }
        }
    }

    return openSpots === 0 ? 'tie' : null;

}

function handleGameEnd(result) {
    setTimeout(() => {
        if (result === 'tie') {
            displayAIMessage('tie');
        } else if (result === human) {
            displayAIMessage('playerWin');
        } else {
            displayAIMessage('aiWin');
        }
        
        setTimeout(() => {
            if (result === 'tie') {
                alert(`Game Over! TIE!`);
            } else {
                alert(`Winner: ${result}`);
                if (result === human) {
                    humanScore++;
                    document.getElementById('human-score').textContent = humanScore;
                } else {
                    aiScore++;
                    document.getElementById('ai-score').textContent = aiScore;
                }
            }

            isHumanFirst = !isHumanFirst;
            setTimeout(() => {
                resetGame();
                if (currentPlayer === ai) {
                    setTimeout(bestMove, 1000);
                }
            }, 500);
        }, 1000);
    }, 500);
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }

    createBoard();

    currentPlayer = isHumanFirst ? human : ai;

}

const additionalStyles = `
.ai-message {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.2em;
    color: #000;
    font-family: 'Fira Code', monospace;
    min-height: 1.5em;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}
`;

const styles = `
${additionalStyles}
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    width: 300px;
    height: 300px;
    padding: 5px;
    border-radius: 5px;
}

.grid-cell {
    background: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
    transition: background-color 0.3s;
}

.grid-cell:hover:empty {
    background: #333;
}

.grid-cell.filled {
    cursor: not-allowed;
}
`;



// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    startGameButton.addEventListener('click', resetGame);
    document.getElementById('reset-scores').addEventListener('click', () => {
        humanScore = 0;
        aiScore = 0;
        document.getElementById('human-score').textContent = '0';
        document.getElementById('ai-score').textContent = '0';
        resetGame();
    });
});