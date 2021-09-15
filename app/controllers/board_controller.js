var Board = require('../models/board').Board;
var TreeNode = require('../models/tree_node').TreeNode;

class BoardFactory {
  constructor() {}

  create(shape, prime_color, second_color) {
    return new Board(shape, this.calcPath(shape), prime_color, second_color);
  }

  calcPath(shape) {
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

    // TODO: build a Graph from the Nodes
    var p = nodes[0];
    for(let n of nodes) {
      if(p != n) {
        // TODO: only add if incident
        p.addDescendant(n);
      } else {
        console.log('is the same');
      }
    }

    console.log(p.getDescendants());
    return path;
  }
}

module.exports.BoardFactory = BoardFactory;
