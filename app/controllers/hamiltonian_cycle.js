class HamiltonianCycle {
  constructor(adjacency_matrix) {
    this.adjacency_matrix = adjacency_matrix;
    this.hamiltonian_path = [];
    this.num_of_vertexes = adjacency_matrix.length;

    this.hamiltonian_path[0] = 0;

    if (!this.findFeasibleSolution(1)) {
        this.hamiltonian_path = null;
    }
  }

  getCycle() {
      return this.hamiltonian_path;
  }

  findFeasibleSolution(position) {
    if (position === this.num_of_vertexes) {
      if (
        this.adjacency_matrix[this.hamiltonian_path[position - 1]][
          this.hamiltonian_path[0]
        ] === 1
      ) {
        return true;
      } else {
        return false;
      }
    }

    for (
      let vertex_index = 1;
      vertex_index < this.num_of_vertexes;
      ++vertex_index
    ) {
      if (this.isFeasible(vertex_index, position)) {
        this.hamiltonian_path[position] = vertex_index;

        if (this.findFeasibleSolution(position + 1)) {
          return true;
        }
      }
    }

    return false;
  }

  isFeasible(vertex_index, actual_position) {
    // first criterion: whether two nodes are connected?
    if (
      this.adjacency_matrix[this.hamiltonian_path[actual_position - 1]][
        vertex_index
      ] == 0
    ) {
      return false;
    }

    // second criterion: whether we have visited it or not
    for (let i = 0; i < actual_position; i++) {
      if (this.hamiltonian_path[i] === vertex_index) {
        return false;
      }
    }
    return true;
  }
}

module.exports.HamiltonianCycle = HamiltonianCycle;
