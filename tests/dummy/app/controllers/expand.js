import Controller from '@ember/controller';

export default Controller.extend({
  expandDepth: 99,
  actions: {
    anotherLevel: function() {
      return this.set('expandDepth', this.get('expandDepth') + 1);
    }
  }
});
