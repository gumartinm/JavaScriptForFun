'use strict';

var KEY = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
var MAPWIDTH = 10;
var MAPHEIGHT = 20;
var TILEWIDTH;
var TILEHEIGHT;
var board;
var boardCanvas;
var boardContext;
var boardUpComingCanvas;
var upComingContext;
var play = false;
var score;
var rows;


var shapes = [
  // Tower piece: I
  { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'red' },
  // The right knight piece: J
  { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'white' },
  // The left knight piece: L
  { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'purple' },
  // The box piece: O
  { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'blue' },
  // The right leaner piece: S
  { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green' },
  // The pyramid piece: T
  { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'yellow' },
  // The left leaner piece: Z
  { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'cyan' }
];





function emptyBoard(m, n) {
  var i;
  var mat = [];
  for (i = 0; i < n; i+= 1) {
    mat[i] = [];
  }

  return mat;
}

function resize() {
  boardCanvas = document.getElementById('canvas');
  boardCanvas.width = boardCanvas.clientWidth;
  boardCanvas.height = boardCanvas.clientHeight;
  TILEWIDTH = boardCanvas.width / MAPWIDTH;
  TILEHEIGHT = boardCanvas.height / MAPHEIGHT;
  boardContext = boardCanvas.getContext('2d');


  boardUpComingCanvas = document.getElementById('upcoming');
  boardUpComingCanvas.width = boardUpComingCanvas.clientWidth;
  boardUpComingCanvas.height = boardUpComingCanvas.clientHeight;
  upComingContext = boardUpComingCanvas.getContext('2d');
}

function drawTile(context, color, x, y) {
  context.fillStyle = color;
  context.fillRect(x * TILEWIDTH, y * TILEHEIGHT, TILEWIDTH, TILEHEIGHT);
}

function getPositions(piece) {
  var positions = [];
  var bit;
  var row = 0, col = 0;
  var blocks = shapes[piece.shape].blocks[piece.rotation];

  for(bit = 0x8000; bit >= 0x0001; bit = bit >> 1) {

    if (blocks & bit) {
      var position = {
        x : piece.x + col,
        y : piece.y + row
      };
      positions.push(position);
    }

    col++;
    if (col === 4) {
      row++;
      col = 0;
    }
  }

  return positions;
}

function pieceBlocks(piece, fn) {
  var i;
  var positions = getPositions(piece);
  for(i = 0; i < positions.length; i += 1) {
    if (fn(positions[i])) {
      return true;
    }
  }

  return false;
}

function drawPiece(context, piece) {
  var color = shapes[piece.shape].color;
  pieceBlocks(piece, function(position) {
    drawTile(context, color, position.x, position.y);
  });
}

function setPiece(board, piece) {
  var color = shapes[piece.shape].color;
  pieceBlocks(piece, function(position) {
    board[position.x][position.y] = color;
  });
}

function checkBoardBoundaries(x, y) {
  return x === MAPWIDTH ||
         x < 0 ||
         y === MAPHEIGHT;
}

function checkOtherPieces(board, x, y) {

  if(typeof board[x][y] !== 'undefined') {
    return true;
  }

  return false;
}

function checkColision(board, piece) {
  return pieceBlocks(piece, function(position) {
    if (checkBoardBoundaries(position.x, position.y) ||
        checkOtherPieces(board, position.x, position.y)) {
      return true;
    }

    return false;
  });
}

function drawBoard(board, context, m, n) {
  var x, y;

  for (x = 0; x < m; x += 1) {
    for (y = 0; y < n; y += 1) {
      if(typeof board[x][y] !== 'undefined') {
        drawTile(context, board[x][y], x, y);
      }
    }
  }

}

function checkRows(board, m, n, fn) {
  var filled, x, y, filledLines;

  filledLines = 0;
  for (y = 0; y < n; y += 1) {

    filled = true;
    for (x = 0; x< m; x += 1) {
      if(typeof board[x][y] === 'undefined') {
        filled = false;
      }
    }
    
    if (filled) {
      filledLines++;
      fn(board, m, y);
    }
  }
  
  if (filledLines !== 0) {
    updateScore(filledLines);
    updateRows(filledLines);
  } 
}

function removeRow(board, m, n) {
  var x, y;
  for(x = 0; x< m; x += 1) {
    for (y = n; y > 0; y -= 1) {
      board[x][y] = board[x][y - 1];
    }
  }
}

function updateScore(n) {
  // 1: 100
  // 2: 200
  // 3: 400
  // 4: 800
  var newScore = (100*Math.pow(2,n-1));
  score = score + newScore;
  document.getElementById('score').innerHTML = ('00000' + Math.floor(score)).slice(-5);
}

function updateRows(n) {
  rows = rows + n;
  document.getElementById('rows').innerHTML = rows;
}

function move(piece, x, y) {
  piece.x = piece.x + x;
  piece.y = piece.y + y; 
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeRandomPiece() {
  var shape = getRandomInt(0, 7);
  var rotation = getRandomInt(0, 4);
  var piece = {
    shape: shape,
    rotation: rotation
  };

  return piece;
}

// 10 secs
var last = null;
var step = 1000;
var currentPiece;
var upComingPiece;



// TODO: polyfill
function frame(timestamp) {
  if (!play) {
    return;
  }

  if (!last) {
    last = timestamp;
  }
  var progress = timestamp - last;
  if (progress >= step) {

    var forwardPiece = {
      shape: currentPiece.shape,
      rotation: currentPiece.rotation,
      x: currentPiece.x,
      y: currentPiece.y + 1
    };

 
    if (checkColision(board, forwardPiece)) {
      setPiece(board, currentPiece);

      checkRows(board, MAPWIDTH, MAPHEIGHT, function(board, m, n) {
        removeRow(board, m, n);
      });


      currentPiece = upComingPiece;
      currentPiece.x = 2;
      currentPiece.y = -1;

      upComingPiece = makeRandomPiece();
      upComingPiece.x = 1;
      upComingPiece.y = 1;
    }

    move(currentPiece, 0, 1);

    boardContext.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
    drawBoard(board, boardContext, MAPWIDTH, MAPHEIGHT);
    drawPiece(boardContext, currentPiece);

    upComingContext.clearRect(0, 0, boardUpComingCanvas.width, boardUpComingCanvas.height);
    drawPiece(upComingContext, upComingPiece);

    last = timestamp;
  }
  window.requestAnimationFrame(frame);
}

function init() {
  currentPiece = makeRandomPiece();
  currentPiece.x = 2;
  currentPiece.y = -1;
  upComingPiece = makeRandomPiece();
  upComingPiece.x = 1;
  upComingPiece.y = 1;

  score = 0;
  document.getElementById('score').innerHTML = '00000';

  rows = 0;
  document.getElementById('rows').innerHTML = '0';

  board = emptyBoard(MAPWIDTH, MAPHEIGHT);
  resize();

  window.requestAnimationFrame(frame);
}

function keydown(ev) {

  switch(ev.keyCode) {
    case KEY.ESC:
      play = false;
      ev.preventDefault();
      break;
    case KEY.SPACE:
      play = true;
      init();
      ev.preventDefault();
      break;
  }

  if (!play) {
    return;
  }
  var forwardPiece = {
    shape: currentPiece.shape,
    rotation: currentPiece.rotation,
    x: currentPiece.x,
    y: currentPiece.y
  };
  switch(ev.keyCode) {
    case KEY.LEFT:
     move(forwardPiece, -1, 0);
      if (!checkColision(board, forwardPiece)) {
        move(currentPiece, -1, 0);
        boardContext.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
        drawBoard(board, boardContext, MAPWIDTH, MAPHEIGHT);
        drawPiece(boardContext, currentPiece);
      }
      ev.preventDefault();
      break;
    case KEY.RIGHT:
     move(forwardPiece, 1, 0);
      if (!checkColision(board, forwardPiece)) {
        move(currentPiece, 1, 0);
        boardContext.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
        drawBoard(board, boardContext, MAPWIDTH, MAPHEIGHT);
        drawPiece(boardContext, currentPiece);
      }
      ev.preventDefault();
      break;
    case KEY.UP:
      var rotation = (forwardPiece.rotation + 1) % 4;
      forwardPiece.rotation = rotation;
      if (!checkColision(board, forwardPiece)) {
        currentPiece.rotation = rotation;
        boardContext.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
        drawBoard(board, boardContext, MAPWIDTH, MAPHEIGHT);
        drawPiece(boardContext, currentPiece);
      }
      ev.preventDefault();
      break;
    case KEY.DOWN:
      move(forwardPiece, 0, 1);
      if (checkColision(board, forwardPiece)) {
        setPiece(board, currentPiece);

        checkRows(board, MAPWIDTH, MAPHEIGHT, function(board, m, n) {
          removeRow(board, m, n);
        });

        currentPiece = upComingPiece;
        currentPiece.x = 2;
        currentPiece.y = -1;

        upComingPiece = makeRandomPiece();
        upComingPiece.x = 1;
        upComingPiece.y = 1;
      }

      move(currentPiece, 0, 1);

      boardContext.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
      drawBoard(board, boardContext, MAPWIDTH, MAPHEIGHT);
      drawPiece(boardContext, currentPiece);

      upComingContext.clearRect(0, 0, boardUpComingCanvas.width, boardUpComingCanvas.height);
      drawPiece(upComingContext, upComingPiece);

      ev.preventDefault();
      break;
  }
}

function addEvents() {
  document.addEventListener('keydown', keydown, false);
  window.addEventListener('resize', resize, false);
}

addEvents();



