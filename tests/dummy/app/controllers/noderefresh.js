import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import Controller from '@ember/controller';

@classic
export default class NoderefreshController extends Controller {
  init() {
    super.init(...arguments);
    this.set('words', ['Foo', 'Bar', 'Baz', 'Qux']);
  }

  randomWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  @action
  addAndRefresh() {
    return this.selected.createChild({
      title: this.randomWord(),
    });
  }

  @action
  getChildren(node) {
    return later(
      this,
      function () {
        let i, o, _results;

        o = Math.floor(Math.random() * this.words.length) + 1;
        if (node.get('level') < 4) {
          i = 0;
          _results = [];
          while (i < o) {
            node.createChild({
              title: this.randomWord(),
            });
            _results.push(i++);
          }
          return _results;
        } else {
          return node.emptyChildren();
        }
      },
      500
    );
  }
}
