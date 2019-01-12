import Route from '@ember/routing/route';
import Node from 'ember-tree-view/node';

export default Route.extend({
  model: function() {
    var root;
    root = Node.create({
      title: 'Family'
    });
    return root;
  }
});
