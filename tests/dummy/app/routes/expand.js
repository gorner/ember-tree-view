import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import Node from '@gorner/ember-tree-view/node';

@classic
export default class ExpandRoute extends Route {
  model() {
    const family = Node.create({
      title: 'Family',
      nodeIcon: 'filing_cabinet',
      expanded: false,
    });

    const suz = family.createChild({
      title: 'Susan',
      nodeIcon: 'folder',
    });

    const lud = family.createChild({
      title: 'Luda',
      nodeIcon: 'folder',
    });

    suz.createChild({
      title: 'Josh',
      nodeIcon: 'folder',
    });

    suz.createChild({
      title: 'Moses',
    });
    lud.createChild({
      title: 'Verdi',
      nodeIcon: 'folder',
    });
    lud.createChild({
      title: 'Gaya',
      nodeIcon: 'folder',
    });

    return family;
  }
}
