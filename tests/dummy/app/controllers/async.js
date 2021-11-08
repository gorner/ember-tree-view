import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { Promise } from 'rsvp';

@classic
export default class AsyncController extends Controller {
  expandDepth = 1;

  init() {
    super.init(...arguments);
    this.set('iconSet', {
      type0: {
        nodeOpenIconName: 'minus',
        nodeCloseIconName: 'plus',
      },
      type1: {
        nodeOpenIconName: `tag`,
        nodeCloseIconName: 'tags',
      },
    });

    this.set('words', ['Foo', 'Bar', 'Baz', 'Qux']);
  }

  randomWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  @action
  anotherLevel() {
    this.expandDepth = this.expandDepth + 1;
    return this.expandDepth;
  }

  @action
  getChildren(node) {
    // return promise for async
    return new Promise((resolve) => {
      later(
        this,
        function () {
          var i, o, _results;
          o = Math.floor(Math.random() * this.words.length) + 1;
          if (node.get('level') < 4) {
            i = 0;
            _results = [];
            while (i < o) {
              node.createChild({
                title: this.randomWord(),
                nodeType: 'type' + Math.floor(Math.random() * 2),
              });
              _results.push(i++);
            }
            resolve(_results);
          } else {
            node.emptyChildren();
            resolve();
          }
        },
        500
      );
    });
  }
}
