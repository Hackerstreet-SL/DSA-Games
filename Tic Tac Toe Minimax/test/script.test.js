const { bestMove, minimax, equals, checkWinner, boardIsFull, insertImage, drawLine, handleGameOver } = require('../public/script.js');

// Create a mock canvas element and context for testing
document.body.innerHTML = '<canvas id="canvas1"></canvas>';
const canvas = document.getElementById('canvas1');
canvas.getContext = jest.fn(() => ({
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  drawImage: jest.fn(),
}));

// Mock the game status text element
document.body.innerHTML += '<div id="game_status"></div>';
const game_status_txt = document.getElementById('game_status');

// Mock the XsAndOs array
const XsAndOs = [
  ['X', 'O', null],
  ['O', 'X', 'O'],
  [null, 'X', 'X'],
];

// Mock the winner_pos array
const winner_pos = [[[0, 0], [2, 2]]];

describe('Tic-Tac-Toe Game Functions', () => {
  it('should make the best move for AI player (X)', () => {
    const scores = { X: 1, O: -1, tie: 0 };
    const minimaxMock = jest.fn(() => 1);
    const move = bestMove(XsAndOs, scores, minimaxMock);
    expect(minimaxMock).toHaveBeenCalledWith(XsAndOs, 0, false);
    expect(move).toEqual(expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }));
  });

  // Test equals function
  it('should return true when three values are equal and not null', () => {
    expect(equals('X', 'X', 'X')).toBe(true);
    expect(equals('O', 'O', 'O')).toBe(true);
    expect(equals(null, null, null)).toBe(false);
    expect(equals('X', 'O', 'X')).toBe(false);
  });

  // Test checkWinner function
  it('should correctly determine the winner or tie', () => {
    expect(checkWinner(XsAndOs)).toBe('X');
    expect(checkWinner([['O', 'O', 'X'], ['X', 'X', 'O'], ['O', 'X', 'O']])).toBe('tie');
    expect(checkWinner([['X', 'O', 'O'], ['O', 'X', 'X'], ['O', 'X', 'X']])).toBe(null);
  });

  // Test boardIsFull function
  it('should return true when the board is full', () => {
    expect(boardIsFull([['X', 'O', 'X'], ['X', 'O', 'X'], ['O', 'X', 'O']])).toBe(true);
    expect(boardIsFull([['X', 'O', 'X'], ['X', null, 'X'], ['O', 'X', 'O']])).toBe(false);
  });

  // Test insertImage function
  it('should insert an image on the canvas', () => {
    const ImageMock = jest.fn();
    const onloadMock = jest.fn();
    ImageMock.mockImplementation(() => ({
      src: '',
      onload: onloadMock,
    }));
    global.Image = ImageMock;
    insertImage('X', 0, 0);
    expect(canvas.getContext().drawImage).toHaveBeenCalled();
    delete global.Image;
  });

  // Test drawLine function
  it('should draw a line connecting winning cells', () => {
    drawLine(winner_pos);
    expect(canvas.getContext().stroke).toHaveBeenCalled();
  });

  // Test handleGameOver function
  it('should handle the game over and send game result', () => {
    const promptMock = jest.fn(() => 'PlayerName');
    global.prompt = promptMock;
    const sendGameResultMock = jest.fn();
    const result = 'Winner is X';
    handleGameOver(game_status_txt, result, sendGameResultMock);
    expect(game_status_txt.textContent).toBe(result);
    expect(promptMock).toHaveBeenCalledWith('Enter your name:');
    expect(sendGameResultMock).toHaveBeenCalledWith('PlayerName', result);
    delete global.prompt;
  });
});
