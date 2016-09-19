import Em from 'ember';
import Node from 'ember-tree-view/node';

export default Em.Route.extend({
  model: function() {
    var root;
    root = Node.create({
      title: 'Family'
    });
    return root;
  }
});
