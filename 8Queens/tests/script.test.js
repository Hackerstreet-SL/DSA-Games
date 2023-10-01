const { solutions, isSafe } = require('../public/script'); 

describe('solutions function', () => {
  test('should generate all possible solutions for the 8-queens problem', () => {
    const result = solutions(0);

    expect(result).toHaveLength(92);

    result.forEach(solution => {
      expect(solution).toHaveLength(8);
    });
  });
});



describe('isSafe function', () => {
  test('should return true for a safe position', () => {
    const queens = [1, 3, 5, 7, 2, 0, 6, 4];
    const row = 3;
    const col = 1;

    const result = isSafe(row, col, queens);

    expect(result).toBe(true);
  });

  test('should return false for an unsafe position', () => {
    const queens = [1, 3, 5, 7, 2, 0, 6, 4];
    const row = 3;
    const col = 5;

    const result = isSafe(row, col, queens);

    expect(result).toBe(false);
  });

});
