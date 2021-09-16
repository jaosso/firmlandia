var Board = require('../models/board').Board;
var TreeNode = require('../models/tree_node').TreeNode;

class BoardFactory {
  constructor() {}

  create(shape, prime_color, second_color) {
    return new Board(shape, this.calcPath(shape), prime_color, second_color);
  }

  calcPath(shape, options = { diagonal: false }) {
    var path = { length: null, path: [] };

    // find start tile and push it to the start of the path
    var width = shape[0].length;
    var height = shape.length;
    var start;
    var nodes = [];

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        if (shape[y].charAt(x) == 'S') {
          start = { x: x, y: y };
          nodes.push(new TreeNode(start));
        } else if (shape[y].charAt(x) == '1') {
          nodes.push(new TreeNode({ x: x, y: y }));
        }
      }
    }

    var adjacencyMatrix = this.buildAdjacencyMatrix(nodes, options.diagonal);

    var hamiltonianCycle = this.buildHamiltonianCycle(adjacencyMatrix);

    if (hamiltonianCycle != null) {
      for (let ind of hamiltonianCycle) {
        path.path.push(nodes[ind].value);
      }

      path.length = hamiltonianCycle.length;
    }

    return path;
  }

  // builds an adjacency matrix; nodes are incident when distance 1 (or sqrt(2) when diagonal is true)
  buildAdjacencyMatrix(nodes, options = { diagonal: false }) {
    var adjacencyMatrix = [];
    var lam = 1;
    if (options.diagonal) lam = Math.sqrt(2);

    for (let m in nodes) {
      var piv_incidence = [];
      for (let i in nodes) {
        if (distanceBetween(nodes[m].getValue(), nodes[i].getValue()) <= lam) {
          piv_incidence[i] = 1;
        } else {
          piv_incidence[i] = 0;
        }
      }
      adjacencyMatrix[m] = piv_incidence;
    }
    return adjacencyMatrix;
  }

  // builds a hamiltonian cycle from an adjacency matrix; returns null if there is no hamiltonian cycle
  buildHamiltonianCycle(adjacencyMatrix) {
    this.adjacencyMatrix = adjacencyMatrix;
    this.hamiltonianPath = [];
    this.numOfVertexes = adjacencyMatrix.length;

    this.hamiltonianPath[0] = 0;

    if (this.findFeasibleSolution(1)) {
      return this.hamiltonianPath;
    }

    return null;
  }

  findFeasibleSolution(position) {
    if (position == this.numOfVertexes) {
      if (
        this.adjacencyMatrix[this.hamiltonianPath[position - 1]][
          this.hamiltonianPath[0]
        ] == 1
      ) {
        return true;
      } else {
        return false;
      }
    }

    for (var vertexIndex = 1; vertexIndex < this.numOfVertexes; ++vertexIndex) {
      if (this.isFeasible(vertexIndex, position)) {
        this.hamiltonianPath[position] = vertexIndex;

        if (this.findFeasibleSolution(position + 1)) {
          return true;
        }
      }
    }

    return false;
  }

  isFeasible(vertexIndex, actualPosition) {
    // first criterion: whether two nodes are connected?
    if (
      this.adjacencyMatrix[this.hamiltonianPath[actualPosition - 1]][
        vertexIndex
      ] == 0
    ) {
      return false;
    }

    // second criterion: whether we have visited it or not
    for (let i = 0; i < actualPosition; i++) {
      if (this.hamiltonianPath[i] == vertexIndex) {
        return false;
      }
    }

    return true;
  }
}

// the quad of the distance between two points
function distanceBetween(p1, p2) {
  var res = Math.sqrt(
    (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y)
  );
  return res;
}

module.exports.BoardFactory = BoardFactory;
