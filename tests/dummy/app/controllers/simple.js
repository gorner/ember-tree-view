import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class SimpleController extends Controller {
  expandDepth = 1;

  @action
  expand() {
    this.selected.toggleProperty('expanded');
    return null;
  }
}
