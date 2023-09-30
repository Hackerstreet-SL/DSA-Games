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

function longestCommonLetterSequence(s1, s2) {
  // Convert the strings to arrays 
  const array1 = Array.from(s1);
  const array2 = Array.from(s2);

  
  //array for store same letters
  let store = [];
  // Sort the 2nd arrays in alphabetical order for binary search
  array2.sort();

  // Perform a binary search to find the longest common sequance
  for (let i = 0; i < array1.length; i++) {
    const index = binarySearch(array2, array1[i]);
    if (index >= 0) {
      store.push(array1[i]);
    }
  }
  // Create a set 
  const seen = new Set();
  // Iterate over the array and add each string to the set
  store.forEach((string) => {
    seen.add(string);
  });
  // Create a new array to store the unique strings
  const newArray = [];

  // Iterate over the set and add each string to the new array
  seen.forEach((string) => {
    newArray.push(string);
  });
  
  
  const lcls = newArray.join('');
  return lcls;// Return the LCLS string
}


function binarySearch(array, target) {
  let low = 0;
  let high = array.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (target < array[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1;
}

// Function to send player results to the server
function sendPlayerAnswer(playerName, userAnswer) {
  fetch('/storeAnswer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ playerName, userAnswer }),
  })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Cannot sending player answer:', error));
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
    const playerName = userName.value;
    const userAnswer = userInput.value;

    if (!playerName) {
      alert('Please enter your name.');
      return;
    }

    if (userAnswer == lcs) {
      resultElement.textContent = `Correct! You Win! The longest common letter sequence is: ${lcs}`;
      
    } else {
      resultElement.textContent = `Incorrect. The correct longest common letter sequence is: ${lcs}`;
    }

    submitButton.disabled = true;
    userInput.disabled = true;
    userName.disabled = true;
    playAgainButton.style.display = 'block';

    //Send player data to server
    sendPlayerAnswer(playerName, userAnswer);
  });

  playAgainButton.addEventListener('click', () => {
    userInput.value = '';
    userName.value='';
    submitButton.disabled = false;
    userInput.disabled = false;
    userName.disabled = false;
    playAgainButton.style.display = 'none';
    playGame();
  });
}

// Initialize the game
console.log('Welcome to the Longest Common Letter Sequence Game!');
playGame();
