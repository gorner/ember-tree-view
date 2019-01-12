import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    expand() {
      this.get('selected').toggleProperty('expanded');
      return null;
    }
  }
});
