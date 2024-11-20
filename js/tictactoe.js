const startGameButton = document.getElementById('start-game');

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  let w; // = width / 3;
  let h; // = height / 3;
  let humanScore = 0;
  let aiScore = 0;

  let ai = 'AI';
  let human = 'Player';
  let currentPlayer = human;
  let isHumanFirst = true;
  
  function setup() {
  // Create the canvas
  const canvas = createCanvas(400, 400);

  // Attach the canvas to the desired container
  canvas.parent('tictactoe-container');

  w = width / 3;
  h = height / 3;

 // Check who plays first
 if (isHumanFirst) {
    currentPlayer = human;
  } else {
    currentPlayer = ai;
   bestMove();
  }

  isHumanFirst = !isHumanFirst; 

  const startGameButton = document.getElementById('start-game');
  startGameButton.addEventListener('click', resetGame);
  }
  
  function equals3(a, b, c) {
    return a == b && b == c && a != '';
  }
  
  function checkWinner() {
    let winner = null;
  
    // horizontal
    for (let i = 0; i < 3; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  
  function mousePressed() {
    if (currentPlayer == human) {
      // Human make turn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // If valid turn
      if (board[i][j] == '') {
        board[i][j] = human;
        currentPlayer = ai;
        setTimeout(bestMove, 400);
        
      }
    }
  }
  
  function draw() {
    background(255);
    stroke(0, 0, 0);
    strokeWeight(4);
  
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
    
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];
        textSize(64);
        let r = w / 4;
        if (spot == human) {
          textAlign(CENTER, CENTER);
          text('O', x, y);
        } else if (spot == ai) {
          textAlign(CENTER, CENTER);
          text('X', x, y);
        }
      }
    }
    
    let result = checkWinner();
  
    if (result != null) {
      noLoop();
      if (result == 'tie') {
        alert("GAME OVER");
        startGameButton.innerText = "Tie";
      } else {
        alert(`... AND THE WINNER IS: ${result} !!!`);
        if (result === human) {
            humanScore ++;
            isHumanFirst = true;
            document.getElementById('human-score').innerText = humanScore;
        } else if (result === ai) {
            aiScore ++;
            isHumanFirst = false;
            document.getElementById('ai-score').innerText = aiScore;
        }
         startGameButton.innerText = `... AND THE WINNER IS: ${result} !!!`;
      }
    }
}


// Reset the game
function resetGame() {
    // Reset the board and game state
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = '';
      }
    }
    
      // Toggle the starting player
      if (isHumanFirst) {
        currentPlayer = human;
    } else {
        currentPlayer = ai;
        bestMove(); // AI makes the first move
    }

    isHumanFirst = !isHumanFirst;
    startGameButton.innerText = "Start Game";
    loop();
  }

  document.getElementById('reset-scores').addEventListener('click', () => {
    humanScore = 0;
    aiScore = 0;
    document.getElementById('human-score').innerText = humanScore;
    document.getElementById('ai-score').innerText = aiScore;
    resetGame();
});
