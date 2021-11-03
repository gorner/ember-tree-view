import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import TreeNode from 'ember-tree-view/node';

@classic
export default class HoveredactionsController extends Controller {
  message = void 0;

  init() {
    super.init(...arguments);

    this.actionsMeta = [
      {
        classes: ['fa fa-eye'],
        action: 'eye',
        types: ['male'],
      },
      {
        classes: ['fa fa-edit'],
        action: 'edit',
        types: ['female'],
      },
      {
        classes: ['fa fa-trash-o'],
        action: 'delete',
      },
    ];

    let family = TreeNode.create(
      {
        title: 'Family',
      },
      {
        nodeType: 'family',
      }
    );
    family.createChild({
      title: 'Susan',
      nodeType: 'male',
    });
    family.createChild({
      title: 'Luda',
      nodeType: 'female',
    });
    return (this.model = family);
  }

  @action
  edit(actionView) {
    return this.set('message', 'Editing ' + actionView.get('model.title'));
  }

  @action
  delete(actionView) {
    return this.set('message', 'Deleting ' + actionView.get('model.title'));
  }

  @action
  eye(actionView) {
    this.set('message', 'Looking at ' + actionView.get('model.title'));
    return actionView.toggleProperty('sticky');
  }
}
