import Em from "ember";
import TreeNode from 'ember-tree-view/node';

export default Em.Controller.extend({
  message: void 0,
  actionsMeta: [
    {
      classes: ['fa fa-eye'],
      action: 'eye',
      types: ['male']
    }, {
      classes: ['fa fa-edit'],
      action: 'edit',
      types: ['female']
    }, {
      classes: ['fa fa-trash-o'],
      action: 'delete'
    }
  ],
  init: function() {
    var family;
    family = TreeNode.create({
      title: 'Family'
    }, {
      nodeType: 'family'
    });
    family.createChild({
      title: 'Susan',
      nodeType: 'male'
    });
    family.createChild({
      title: 'Luda',
      nodeType: 'female'
    });
    return this.set('model', family);
  },
  actions: {
    edit: function(actionView) {
      return this.set('message', "Editing " + (actionView.get('model.title')));
    },
    "delete": function(actionView) {
      return this.set('message', "Deleting " + (actionView.get('model.title')));
    },
    eye: function(actionView) {
      this.set('message', "Looking at " + (actionView.get('model.title')));
      return actionView.toggleProperty('sticky');
    }
  }
});
