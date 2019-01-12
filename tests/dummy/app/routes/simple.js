import Route from '@ember/routing/route';
import Node from 'ember-tree-view/node';

export default Route.extend({
  model() {
    let family, lud, suz;
    family = Node.create({
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
    return family;
  }
});
