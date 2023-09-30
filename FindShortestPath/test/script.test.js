const { Graph, dijkstra, shortestPath } = require('../public/script.js'); 

// Create a test graph for the dijkstra and shortestPath functions
const testGraph = new Graph();
testGraph.addNode("A");
testGraph.addNode("B");
testGraph.addNode("C");
testGraph.addNode("D");
testGraph.addEdge("A", "B", 2);
testGraph.addEdge("A", "C", 1);
testGraph.addEdge("B", "D", 3);
testGraph.addEdge("C", "D", 4);

describe('Dijkstra Algorithm', () => {
  test('Should find the shortest distances', () => {
    const { distances } = dijkstra(testGraph, "A");
    expect(distances.get("A")).toBe(0);
    expect(distances.get("B")).toBe(2);
    expect(distances.get("C")).toBe(1);
    expect(distances.get("D")).toBe(3);
  });

  test('Should handle unconnected nodes', () => {
    const { distances } = dijkstra(testGraph, "A");
    expect(distances.get("E")).toBe(undefined); // "E" is not connected to the graph
  });
});

describe('Shortest Path', () => {
  test('Should find the shortest path', () => {
    const path = shortestPath(testGraph, "A", "D");
    expect(path).toEqual(["A", "B", "D"]);
  });

  test('Should handle unconnected nodes', () => {
    const path = shortestPath(testGraph, "A", "E");
    expect(path).toEqual([]); // No path to "E"
  });
});
