/**
 * @description Finds the best move for the AI using the minimax algorithm
 * @returns {void}
 */
function bestMove() {
 
    let bestScore = -Infinity;
    let move;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
     
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, 0, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
  
    board[move.i][move.j] = ai;
    currentPlayer = human;
    updateDisplay();

    const result = checkWinner();
    if (result !== null) {
      handleGameEnd(result);
    }
  }
  
  let scores = {
    AI: 10,
    Player: -10,
    tie: 0
  };
  
/**
 * @description Implements the minimax algorithm to find the best move for the AI
 * @param {Array} board - The current game board
 * @param {number} depth - The depth of the current move
 * @param {boolean} isMaximizing - Whether the AI is maximizing or minimizing
 * @returns {number} The best score for the AI
 */
  function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        
          if (board[i][j] == '') {
            board[i][j] = ai;
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
         
          if (board[i][j] == '') {
            board[i][j] = human;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
