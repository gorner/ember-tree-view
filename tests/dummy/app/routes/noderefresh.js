import Route from '@ember/routing/route';
import TreeNode from 'ember-tree-view/node';

export default Route.extend({
  model: function() {
    var root;
    root = TreeNode.create({
      title: 'Family'
    });
    return root;
  }
});
