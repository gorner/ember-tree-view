import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import TreeNode from '@gorner/ember-tree-view/node';

@classic
export default class NoderefreshRoute extends Route {
  model() {
    return TreeNode.create({
      title: 'Family',
    });
  }
}
