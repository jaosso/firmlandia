var Board = require('../models/board').Board;
var HamiltonianCycle = require('./hamiltonian_cycle').HamiltonianCycle;

class BoardController {
  constructor() {}

  create(options) {
    options = Object.assign(
      {
        shape: null,
        path: null,
        diagonal: false,
        prime_color: null,
        second_color: null,
      },
      options
    );

    return new Board(
      options.shape,
      options.path || this.calcPath(options.shape, {diagonal: options.diagonal}),
      options.prime_color,
      options.second_color
    );
  }

  calcPath(shape, options = { diagonal: false }) {
    var path = { length: null, path: [] };

    // find start tile and push it to the start of the path
    var width = shape[0].length;
    var height = shape.length;
    var start;
    var nodes = [];

    if (width === 0 || height === 0) return path;

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        if (shape[y].charAt(x) === 'S') {
          start = { x: x, y: y };
        } else if (shape[y].charAt(x) === '1') {
          nodes.push({ x: x, y: y });
        }
      }
    }

    nodes.unshift(start);

    var adjacencyMatrix = this.buildAdjacencyMatrix(nodes, options.diagonal);

    var hamiltonianCycle = new HamiltonianCycle(adjacencyMatrix).getCycle();

    if (hamiltonianCycle != null) {
      for (let ind of hamiltonianCycle) {
        path.path.push(nodes[ind]);
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
        if (distanceBetween(nodes[m], nodes[i]) <= lam) {
          piv_incidence[i] = 1;
        } else {
          piv_incidence[i] = 0;
        }
      }
      adjacencyMatrix[m] = piv_incidence;
    }
    return adjacencyMatrix;
  }
}

// the quad of the distance between two points
function distanceBetween(p1, p2) {
  var res = Math.sqrt(
    (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y)
  );
  return res;
}

module.exports.BoardController = BoardController;
