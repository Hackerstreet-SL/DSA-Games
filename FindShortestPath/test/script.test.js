import { getRandomLetterPair, shortestPath } from '../public/script.js';

describe('shortestPath functions', () => {
  it('should return a random letter pair from the input string', () => {
    const input = 'ABCDEFGHIJKL';

    const [letter1, letter2] = getRandomLetterPair(input);

    expect(letter1).toEqual(expect.any(String));
    expect(letter2).toEqual(expect.any(String));
    expect(input.includes(letter1)).toBeTruthy();
    expect(input.includes(letter2)).toBeTruthy();
  });

  it('should throw an error if the input string is less than 2 letters', () => {
    const input = 'A';

    expect(() => getRandomLetterPair(input)).toThrowError();
  });

  it('should return the shortest path between two nodes in a valid graph', () => {
    const graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addNode('C');
    graph.addEdge('A', 'B', 10);
    graph.addEdge('B', 'C', 5);

    const shortestPathResult = shortestPath(graph, 'A', 'C');

    expect(shortestPathResult).toEqual(['A', 'B', 'C']);
  });

  it('should throw an error if the graph is invalid', () => {
    const graph = new Graph();

    expect(() => shortestPath(graph, 'A', 'B')).toThrowError();
  });

  it('should throw an error if a node is missing from the graph', () => {
    const graph = new Graph();
    graph.addNode('A');

    expect(() => shortestPath(graph, 'A', 'B')).toThrowError();
  });
});
