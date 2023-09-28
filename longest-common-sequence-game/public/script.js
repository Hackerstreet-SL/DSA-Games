// Select HTML elements
const string1Element = document.getElementById('string1');
const string2Element = document.getElementById('string2');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const resultElement = document.getElementById('result');
const playAgainButton = document.getElementById('play-again-button');
const userName = document.getElementById('user-name');

// Function to generate a random alphabetic string
function generateRandomAlphabeticString(length) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    result += alphabet.charAt(randomIndex);
  }
  return result;
}

// Function to find the longest common sequence of letters between two strings
function longestCommonLetterSequence(s1, s2) {
  const set1 = new Set(s1);
  const set2 = new Set(s2);
  const commonLetters = [];
  
  // Convert the sets to arrays for easier iteration
  const array1 = Array.from(set1);
  const array2 = Array.from(set2);
  
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] == array2[j]) {
        commonLetters.push(array1[i]);
        break; // Break to avoid duplicate letters in the result
      }
    }
  }
  
  return commonLetters.join('');
}


// Function to play the game
function playGame() {
  const s1 = generateRandomAlphabeticString(10);
  const s2 = generateRandomAlphabeticString(10);

  string1Element.textContent = s1;
  string2Element.textContent = s2;
  resultElement.textContent = '';

  const lcs = longestCommonLetterSequence(s1, s2); // Calculate the correct answer

  submitButton.addEventListener('click', () => {
    const userAnswer = userInput.value;

    if (userAnswer == lcs) {
      resultElement.textContent = `Correct! You Win! The longest common letter sequence is: ${lcs}`;
    } else {
      resultElement.textContent = `Incorrect. The correct longest common letter sequence is: ${lcs}`;
    }

    submitButton.disabled = true;
    userInput.disabled = true;
    playAgainButton.style.display = 'block';
    
  });

  playAgainButton.addEventListener('click', () => {
    userInput.value = '';
    submitButton.disabled = false;
    userInput.disabled = false;
    playAgainButton.style.display = 'none';
    playGame();
  });
}

// Initialize the game
console.log('Welcome to the Longest Common Letter Sequence Game!');
playGame();
