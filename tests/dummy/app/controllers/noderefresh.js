import Em from "ember";

export default Em.Controller.extend({
  init() {
    this._super(...arguments);
    this.set("words", ['Foo', 'Bar', 'Baz', 'Qux'],)
  },

  randomWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },

  actions: {
    addAndRefresh() {
      return this.get('selected').createChild({
        title: this.randomWord()
      });
    },
    getChildren(node) {
      return Em.run.later(this, function() {
        let i, o, _results;
        o = Math.floor(Math.random() * this.words.length) + 1;
        if (node.get('level') < 4) {
          i = 0;
          _results = [];
          while (i < o) {
            node.createChild({
              title: this.randomWord()
            });
            _results.push(i++);
          }
          return _results;
        } else {
          return node.emptyChildren();
        }
      }, 500);
    }
  }
});
