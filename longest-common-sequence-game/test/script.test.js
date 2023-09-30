const {
    longestCommonLetterSequence,
    generateRandomAlphabeticString,
    binarySearch,
  } = require('../public/script.js'); 
  
  describe('generateRandomAlphabeticString function', () => {
    it('should generate a random string of the specified length', () => {
      const length = 10;
      const randomString = generateRandomAlphabeticString(length);
      expect(randomString.length).toBe(length);
      expect(/^[a-z]+$/.test(randomString)).toBe(true); // Check if the string only contains lowercase letters
    });
  });
  
  describe('binarySearch function', () => {
    it('should return the index of the target element in the sorted array', () => {
      const array = ['a', 'b', 'c', 'd', 'e'];
      const target = 'c';
      const index = binarySearch(array, target);
      expect(index).toBe(2);
    });
  
    it('should return -1 for a target not found in the array', () => {
      const array = ['a', 'b', 'c', 'd', 'e'];
      const target = 'f';
      const index = binarySearch(array, target);
      expect(index).toBe(-1);
    });
  });
  
  describe('longestCommonLetterSequence function', () => {
    it('should find the longest common letter sequence between two strings', () => {
      const s1 = 'abcdef';
      const s2 = 'bcdfgh';
      const lcls = longestCommonLetterSequence(s1, s2);
      expect(lcls).toBe('bcdf');
    });
  
    it('should handle strings with no common letters', () => {
      const s1 = 'abc';
      const s2 = 'def';
      const lcls = longestCommonLetterSequence(s1, s2);
      expect(lcls).toBe('');
    });
  
    
  });
  