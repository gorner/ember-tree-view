import { action, set } from '@ember/object';
import Controller from '@ember/controller';

export default class ExpandController extends Controller {
  expandDepth = 99;

  @action
  anotherLevel() {
    set(this, 'expandDepth', this.expandDepth + 1);
    return this.expandDepth;
  }
}
