import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from "@ember/controller";

@classic
export default class MultiselectionController extends Controller {
  @computed('multi.length')
  get multiNames() {
    var s;
    s = "";
    this.multi.forEach(function(r) {
      return s += " " + r.get('title');
    });
    return s;
  }

  init() {
    super.init(...arguments);
    this.set("multi", []);
  }
}
