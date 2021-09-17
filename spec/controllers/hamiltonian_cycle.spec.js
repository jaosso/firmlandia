var HamiltonianCycle =
  require('../../app/controllers/hamiltonian_cycle').HamiltonianCycle;

describe('Hamiltonian cycle is calculated correctly ', function () {
  test('from empty adjacency matrix, fails', function () {
    var adjacencyMatrix = [[]];
    var hamiltonianCycle = new HamiltonianCycle(adjacencyMatrix);

    expect(hamiltonianCycle.getCycle()).toEqual(null);
  });

  test('when there is a hamiltonian cycle, fails', function () {
    var invalidAdjacencyMatrix = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];

    var hamiltonianCycle = new HamiltonianCycle(invalidAdjacencyMatrix);

    expect(hamiltonianCycle.getCycle()).toEqual(null);
  });

  test('when there is a hamiltonian cycle, fails', function () {
    var validAdjacencyMatrix = [
      [1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 1],
    ];
    var hamiltonianCycle = new HamiltonianCycle(validAdjacencyMatrix);

    expect(hamiltonianCycle.getCycle()).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });
});