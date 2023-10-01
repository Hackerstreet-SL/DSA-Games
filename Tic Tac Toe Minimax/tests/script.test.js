// script.test.js
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body><canvas id="canvas1"></canvas></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = {
  userAgent: 'node.js',
};

const minimax = require('../public/script'); 

test('minimax function returns the correct move for a win', () => {
  const board = [
    ['X', 'O', 'X'],
    ['O', 'X', null],
    [null, null, 'O'],
  ];

  const move = minimax(board, 0, false);

  expect(move).toEqual({ x: 2, y: 0 });
});

test('minimax function returns the correct move for a block', () => {
  const board = [
    ['X', 'O', null],
    [null, 'O', 'X'],
    ['X', null, null],
  ];

  const move = minimax(board, 0, false);
 
  expect(move).toEqual({ x: 2, y: 2 });
});