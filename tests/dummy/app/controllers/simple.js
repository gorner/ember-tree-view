import Controller from '@ember/controller';

export default Controller.extend({
  expandDepth: 1,
  actions: {
    expand() {
      this.get('selected').toggleProperty('expanded');
      return null;
    },
  },
});
