import Em from "ember";
import TreeNode from 'ember-tree-view/node';

export default Em.Controller.extend({
  init() {
    var family, lud, suz;
    family = TreeNode.create({
      title: 'Family'
    });
    suz = family.createChild({
      title: 'Susan'
    });
    lud = family.createChild({
      title: 'Luda'
    });
    suz.createChild({
      title: 'Josh'
    });
    suz.createChild({
      title: 'Moses'
    });
    lud.createChild({
      title: 'Verdi'
    });
    lud.createChild({
      title: 'Gaya'
    });
    return this.set('model', family);
  },
  actions: {
    expand: function() {
      this.get('selected').toggleProperty('expanded');
      return null;
    }
  }
});
