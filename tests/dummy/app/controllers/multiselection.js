import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default Controller.extend({
  multiNames: computed('multi.length', {
    get() {
      var s;
      s = "";
      this.multi.forEach(function(r) {
        return s += " " + r.get('title');
      });
      return s;
    }
  }),
  init() {
    this._super(...arguments);
    this.set("multi", []);
  }
});
