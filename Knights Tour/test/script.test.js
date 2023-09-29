const { isValidMove, solveProblem } = require('../public/script.js')
const { JSDOM } = require('jsdom');

const chessboardSize = 8;
let board;

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost',
});

global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

beforeEach(() => {
    // Reset Chess Board before each test
    board = Array.from({ length: chessboardSize }, () => Array(chessboardSize).fill(0));
});

describe('isValidMove', () => {
    test('isValidMove returns true for valid move', () => {
        expect(isValidMove(1, 2)).toBe(true);
    });
    
    test('isValidMove returns false for invalid move', () => {
        expect(isValidMove(4, 4)).toBe(false);
    });
});

describe('solveProblem', () => {
    test('solveProblem solves the problem correctly', () => {
        const solved = solveProblem(board, 0, 0, 1);
        expect(solved).toBe(true);
    });  
});

