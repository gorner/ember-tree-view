import Ember from 'ember';

var Node = Ember.Object.extend({
  children: void 0,
  parent: void 0,

  addChild(node) {
    if (!this.get('children')) {
      this.emptyChildren();
    }
    node.set('parent', this);
    this.children.addObject(node());
    return node;
  },

  createChild(object) {
    //let c1 = Node.create();

    if (!this.get('children')) {
      this.emptyChildren();
    }
    let c = Node.create(object);
    c.set('parent', this);
    this.get('children').pushObject(c);
    return c;
  },

  removeChild(node) {
    node.set('parent', void 0);
    this.children.removeObject(node);
    return node;
  },

  hasChildren: Ember.computed('children.length', {
    get() {
      var _ref;
      return (_ref = this.get('children')) != null ? _ref.length : void 0;
    }
  }),

  emptyChildren: (function() {
    return this.set('children', Ember.A());
  }),

  hasParent: Ember.computed('parent.parent', {
    get() {
      return this.get('parent.parent') != null;
    }
  }),

  root: Ember.computed('parent', {
    get() {
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
  }),

  level: Ember.computed('children.length', {
    get() {
      let currObj = this;
      let i = 0;

      while (currObj.get('hasParent')) {
        i++;
        currObj = currObj.get('parent');
      }
      return i;
    }
  }),

  isLevel1: Ember.computed('children.length', {
    get() {
      return this.get('level') === 0;
    }
  }),

  findChildBy: function(key, name) {
    return this._findChildrenOfNodeBy(this, key, name);
  },

  _findChildrenOfNodeBy(currChild, key, value) {
    var c, _i, _len, _ref, _ref1;
    if (currChild.get(key) === value) {
      return currChild;
    } else if (((_ref = currChild.get('children')) != null ? _ref.length : void 0) > 0) {
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
});

export default Node;
