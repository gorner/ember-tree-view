import classic from 'ember-classic-decorator';
import { gt, notEmpty } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';

@classic
export default class TreeNode extends EmberObject {
  children = void 0;
  parent = void 0;

  addChild(node) {
    if (!this.children) {
      this.emptyChildren();
    }
    node.set('parent', this);
    this.children.addObject(node());
    return node;
  }

  createChild(object) {
    if (!this.children) {
      this.emptyChildren();
    }
    let c = TreeNode.create(object);
    c.set('parent', this);
    this.children.pushObject(c);
    return c;
  }

  removeChild(node) {
    node.set('parent', void 0);
    this.children.removeObject(node);
    return node;
  }

  @gt('children.length', 0)
  hasChildren;

  emptyChildren() {
    return this.set('children', A());
  }

  @notEmpty('parent')
  hasParent;

  @computed('parent')
  get root() {
    let node;
    node = this;
    while (node.get('hasParent')) {
      if (!node.get('hasParent')) {
        return node;
      }
      node = node.get('parent');
    }
    return node;
  }

  @computed('children.length')
  get level() {
    let currObj = this;
    let i = 0;

    while (currObj.get('hasParent')) {
      i++;
      currObj = currObj.get('parent');
    }
    return i;
  }

  @computed('level')
  get isLevel1() {
    return this.level === 0;
  }

  findChildBy(key, name) {
    return this._findChildrenOfNodeBy(this, key, name);
  }

  _findChildrenOfNodeBy(currChild, key, value) {
    var c, _i, _len, _ref, _ref1;
    if (currChild.get(key) === value) {
      return currChild;
    } else if (
      ((_ref = currChild.get('children')) != null ? _ref.length : void 0) > 0
    ) {
      _ref1 = currChild.get('children');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        c = _ref1[_i];
        if (c.get(key) === value) {
          return c;
        } else {
          this._findChildrenOfNodeBy(c, key, value);
        }
      }
      return null;
    }
    return null;
  }
}
