import Controller from '@ember/controller';
import { later } from "@ember/runloop";
import { Promise } from 'rsvp';

export default Controller.extend({
  expandDepth: 1,

  init() {
    this._super(...arguments);
    this.set("iconSet",  {
      type0: {
        nodeOpenIconClasses: ['fa-li', 'fa', 'fa-minus-square-o'],
        nodeCloseIconClasses: ['fa-li', 'fa', 'fa-plus-square-o']
      },
      type1: {
        nodeOpenIconClasses: ['fa-li', 'fa', 'fa-tag'],
        nodeCloseIconClasses: ['fa-li', 'fa', 'fa-tags']
      }
    });

    this.set("words", ['Foo', 'Bar', 'Baz', 'Qux']);
  },

  randomWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },

  actions: {
    anotherLevel() {
      return this.set('expandDepth', this.get('expandDepth') + 1);
    },
    getChildren(node) { // return promise for async
      return new Promise(resolve => {
        later(this, function() {
          var i, o, _results;
          o = Math.floor(Math.random() * this.words.length) + 1;
          if (node.get('level') < 4) {
            i = 0;
            _results = [];
            while (i < o) {
              node.createChild({
                title: this.randomWord(),
                nodeType: "type" + (Math.floor(Math.random() * 2))
              });
              _results.push(i++);
            }
            resolve(_results);
          } else {
            node.emptyChildren();
            resolve();
          }
        }, 500);
      });
    }
  }
});
