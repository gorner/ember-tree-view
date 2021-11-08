import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import Node from 'ember-tree-view/node';

@classic
export default class AsyncRoute extends Route {
  model() {
    var root;
    root = Node.create({
      title: 'Family',
    });
    return root;
  }
}
