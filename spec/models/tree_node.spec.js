var TreeNode = require('../../app/models/tree_node').TreeNode;

describe('Tree node works fine ', function() {
    var node;
    beforeAll(function() {
        node = new TreeNode('value');
    });

    test('getters work properly, succeeds', function() {
        expect(node.getValue()).toEqual('value');
    });

    test('setters work properly, succeeds', function() {
        node.setValue('new value');
        expect(node.getValue()).toEqual('new value');
    });

    test('add dependents', function() {
        var descendant = new TreeNode('descendant');
        node.addDescendant(descendant);
        expect(node.getDescendants()[0]).toEqual(descendant);
    });
});