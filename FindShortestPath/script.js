const start_Node = document.getElementById("startNode");
const end_Node = document.getElementById("endNode");
const submit_button = document.getElementById("submit-button")
// const resultElement = document.getElementById('result');
// const playAgainButton = document.getElementById('play-again-button');

function getRandomLetterPair(input) {
    if (input.length < 2) {
      throw new Error("Input string must contain at least 2 letters."); 
    }
  
    // Generate random indices for the two letters
    const index1 = Math.floor(Math.random() * input.length);
    let index2 = Math.floor(Math.random() * input.length);
  
    // Ensure the two indices are different
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * input.length);
    }
  
    // Get the letters at the generated indices
    const letter1 = input.charAt(index1);
    const letter2 = input.charAt(index2);
  
    return [letter1, letter2];
}
function findShortestPath(){

}

function playGame(){
    const input = "ABCDEFGHIJK";  
    const [letter1, letter2] = getRandomLetterPair(input);
    
    console.log(`Random letters: ${letter1} and ${letter2}`);
    start_Node.value = letter1;
    end_Node.value = letter2;
    resultElement.textContent = '';

    const shortest_path = findShortestPath();
    submit_button.addEventListener('click', () => {
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
}

playGame();