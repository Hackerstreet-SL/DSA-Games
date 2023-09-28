const start_Node = document.getElementById("startNode");
const end_Node = document.getElementById("endNode");
const submit_button = document.getElementById("submit-button");
const user_input = document.getElementById("userInput");
const resultElement = document.getElementById("result");
const nameOfPlayer = document.getElementById("EnterName");

// const playAgainButton = document.getElementById('play-again-now');

class Graph {
  constructor() {
    this.nodes = new Set();
    this.edges = new Map();
  }

  addNode(node) {
    this.nodes.add(node);
    this.edges.set(node, []);
  }

  addEdge(node1, node2, weight) {
    this.edges.get(node1).push({ node: node2, weight });
  }
}

function getRandomLetterPair(input) {
  if (input.length < 2) {
    throw new Error("Input string must contain at least 2 letters.");
  }

  const index1 = Math.floor(Math.random() * input.length);
  let index2 = Math.floor(Math.random() * input.length);

  while (index2 === index1) {
    index2 = Math.floor(Math.random() * input.length);
  }

  const letter1 = input.charAt(index1);
  const letter2 = input.charAt(index2);

  return [letter1, letter2];
}

function dijkstra(graph, start) {
  const distances = new Map();
  const previous = new Map();
  const queue = [];

  for (const node of graph.nodes) {
    distances.set(node, Infinity);
    previous.set(node, null);
    queue.push(node);
  }

  distances.set(start, 0);

  while (queue.length > 0) {
    queue.sort((a, b) => distances.get(a) - distances.get(b));
    const smallest = queue.shift();

    for (const neighborData of graph.edges.get(smallest)) {
      const neighbor = neighborData.node;
      const alt = distances.get(smallest) + neighborData.weight;
      if (alt < distances.get(neighbor)) {
        distances.set(neighbor, alt);
        previous.set(neighbor, smallest);
      }
    }
  }

  return { distances, previous };
}

function shortestPath(graph, start, end) {
  const { distances, previous } = dijkstra(graph, start);
  const path = [];
  let current = end;

  while (current !== null) {
    path.unshift(current);
    current = previous.get(current);
  }

  return path;
}

const graph = new Graph();
const cities = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

for (const city of cities) {
  graph.addNode(city);
}

graph.addEdge("A", "B", 49);
graph.addEdge("A", "G", 27);
graph.addEdge("B", "C", 12);
graph.addEdge("C", "D", 19);
graph.addEdge("C", "F", 20);
graph.addEdge("D", "H", 25);
graph.addEdge("E", "G", 15);
graph.addEdge("E", "F", 44);
graph.addEdge("F", "A", 10);
graph.addEdge("F", "I", 39);
graph.addEdge("G", "J", 27);
graph.addEdge("G", "I", 18);
graph.addEdge("G", "K", 40);
graph.addEdge("H", "I", 5);
graph.addEdge("I", "L", 17);
graph.addEdge("J", "K", 30);
graph.addEdge("K", "L", 35);
graph.addEdge("L", "H", 13);
graph.addEdge("I", "E", 23);

const input = "ABCDEFGHIJKL";
const [letter1, letter2] = getRandomLetterPair(input);

console.log(`Random letters: ${letter1} and ${letter2}`);
console.log(graph);
start_Node.value = letter1;
end_Node.value = letter2;
resultElement.textContent = "";

submit_button.addEventListener("click", () => {
  const userAnswer = userInput.value;
  console.log(userAnswer);
  const shortestPathResult = shortestPath(graph, letter1, letter2);

  console.log(shortestPathResult);
  const shortWord = shortestPathResult.join("");
  console.log(shortWord);
  console.log(`Shortest path from ${letter1} to ${letter2}: ${shortestPathResult.join(" -> ")}`);
  if (userAnswer === shortWord) {
    resultElement.textContent = `Correct! You Win! : ${shortestPathResult.join(" -> ")}`;
  } else {
    resultElement.textContent = `Incorrect. The correct Shortest path is: ${shortestPathResult.join(" -> ")}`;
  }

  submit_button.disabled = true;
  userInput.disabled = true;
  // playAgainButton.style.display = 'block';
});
