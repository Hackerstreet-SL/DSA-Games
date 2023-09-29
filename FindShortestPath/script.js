const start_Node = document.getElementById("startNode");
const end_Node = document.getElementById("endNode");
const submit_button = document.getElementById("submit-button");
const user_input = document.getElementById("userInput");
const resultElement = document.getElementById("result");
const nameOfPlayer = document.getElementById("EnterName");

const AB  = document.getElementById("AB");
const AG  = document.getElementById("AG");
const AF  = document.getElementById("AF");
const BC  = document.getElementById("BC");
const CD  = document.getElementById("CD");
const CF  = document.getElementById("CF");
const DH  = document.getElementById("DH");
const EG  = document.getElementById("EG");
const EF  = document.getElementById("EF");
const FI  = document.getElementById("FI");
const GJ  = document.getElementById("GJ");
const GI  = document.getElementById("GI");
const GK  = document.getElementById("GK");
const HI  = document.getElementById("HI");
const HL  = document.getElementById("HL");
const IL  = document.getElementById("IL");
const JK  = document.getElementById("JK");
const KL  = document.getElementById("KL");
const IE  = document.getElementById("IE");

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

AB.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("A", "B", AB.textContent);
AG.textContent =  Math.floor(Math.random() * 90 + 10);
graph.addEdge("A", "G", AG.textContent);
BC.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("B", "C", BC.textContent);
CD.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("C", "D", CD.textContent);
CF.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("C", "F", CF.textContent);
DH.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("D", "H", DH.textContent);
EG.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("E", "G", EG.textContent);
EF.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("E", "F", EF.textContent);
FA.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("F", "A", FA.textContent);
FI.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("F", "I", FI.textContent);
GJ.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("G", "J", GJ.textContent);
GI.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("G", "I", GI.textContent);
GK.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("G", "K", GK.textContent);
HI.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("H", "I", HI.textContent);
IL.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("I", "L", IL.textContent);
JK.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("J", "K", JK.textContent);
KL.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("K", "L", KL.textContent);
LH.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("L", "H", LH.textContent);
IE.textContent = Math.floor(Math.random() * 90 + 10);
graph.addEdge("I", "E", IE.textContent);

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
