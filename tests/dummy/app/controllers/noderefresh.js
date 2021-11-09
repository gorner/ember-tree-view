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
}
