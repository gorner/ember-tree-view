import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import Node from 'ember-tree-view/node';

@classic
export default class SimpleRoute extends Route {
  model() {
    let family, lud, suz;
    family = Node.create({
      title: 'Family',
      nodeIcon: 'filing_cabinet',
      expanded: true,
    });
    suz = family.createChild({
      title: 'Susan',
      nodeIcon: 'folder',
    });
    lud = family.createChild({
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
