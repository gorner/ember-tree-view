import Ember from "ember";

export default Ember.Controller.extend({
  multi: Ember.A(),
  multiNames: Ember.computed('multi.length', {
    get() {
      var s;
      s = "";
      this.multi.forEach(function(r) {
        return s += " " + r.get('title');
      });
      return s;
    }
  })
});
