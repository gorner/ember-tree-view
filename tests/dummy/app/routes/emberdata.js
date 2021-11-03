import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class EmberdataRoute extends Route {
  model() {
    return this.store.find('tag', 1);
  }
}
