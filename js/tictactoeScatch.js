
const startGameButton = document.getElementById('start-game');

const aiMessages = {
    start: {
        humanFirst: "I'll let you go first. Choose wisely...",
        aiFirst: "This time, I'll make the first move..."
    },
    playerMove: [
        "Interesting choice...",
        "Is that the best you can do?",
        "Hmm, I saw that coming.",
        "Playing it safe, aren't we?",
        "Clever move, but not clever enough.",
        "Oh, so you're going for that strategy, huh?",
        "I've seen better moves.",
        "Are you sure about that?",
        "Trying to trick me, are you?",
        "You're making this fun!",
        "A bold move, human.",
        "Ah, the classic approach.",
        "You're predictable, but let's see where this goes."
    ],
    aiMove: [
        "Watch this move...",
        "Let me show you how it's done.",
        "My turn, human.",
        "This should be interesting..."
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

/**
 * @description Game state variables
 */

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let humanScore = 0;
let aiScore = 0;
let ai = 'AI';
let human = 'Player';
let currentPlayer = human;
let isHumanFirst = true;

/**
 * @description Creates and initializes the game board
 * @returns {void}
 */
function createBoard() {
    const container = document.getElementById('tictactoe-container');
    container.innerHTML = '';

    const messageDisplay = document.createElement('div');
    messageDisplay.id = 'ai-message';
    messageDisplay.className = 'ai-message';
    messageDisplay.textContent = isHumanFirst ? aiMessages.start.humanFirst : aiMessages.start.aiFirst;
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

/**
 * @description Displays the AI message based on the message type
 * @param {string} messageType - The type of message to display
 * @returns {void}
 */
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

/**
 * @description Handles player's move when a cell is clicked
 * @param {Event} event - Click event object
 * @returns {void}
 */
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

/**
 * @description Updates the game display after each move
 * @returns {void}
 */
function updateDisplay() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        const value = board[row][col];
   
        if (value === 'AI') {
            cell.textContent = 'X';
        } else if (value === 'Player') {
            cell.textContent = 'O';
        } else {
            cell.textContent = '';
        }
        
      
        let classes = ['grid-cell'];
        if (value) {
            classes.push('filled');
            if (value === 'AI') {
                classes.push('ai-cell');
            } else if (value === 'Player') {
                classes.push('human-cell');
            }
        }
        cell.className = classes.join(' ');
    });
}

/**
 * @description Checks the winner of the game
 * @returns {string|null} The winner or 'tie' if no winner, or null if the game is still in progress
 */
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

/**
 * @description Handles the end of the game and updates the score
 * @param {string} result - The result of the game
 * @returns {void}
 */
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
         
            } else {
               
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

/**
 * @description Resets the game state to its initial state
 * @returns {void}
 */
function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }

    createBoard();

    currentPlayer = isHumanFirst ? human : ai;

}
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

