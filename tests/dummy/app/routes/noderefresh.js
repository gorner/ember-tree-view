import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import TreeNode from 'ember-tree-view/node';

@classic
export default class NoderefreshRoute extends Route {
  model() {
    var root;
    root = TreeNode.create({
      title: 'Family'
    });
    return root;
  }
}
