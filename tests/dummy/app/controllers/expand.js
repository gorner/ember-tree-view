import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ExpandController extends Controller {
  expandDepth = 99;

  @action
  anotherLevel() {
    this.expandDepth = this.expandDepth + 1;
    return this.expandDepth;
  }
}
