class TreeNode {
    constructor(value) {
        this.value = value;
        this.descendants = [];
    }

    getValue() {
        return this.value;
    }

    getDescendants() {
        return this.descendants;
    }

    setValue(value) {
        this.value = value;
    }

    addDescendant(descendant) {
        this.descendants.push(descendant);
    }
}

module.exports.TreeNode = TreeNode;