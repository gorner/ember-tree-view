import WithConfigMixin from 'ember-tree-utils/mixins/with-config';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { A } from '@ember/array';

// eslint-disable-next-line no-unused-vars
const refreshExpanded = (node) => {
  let children;
  if (node.get('expanded')) {
    node.set('requestReload', true);
  }
  children = node.get('children');
  if (children && children.length) {
    return refreshExpanded(children);
  }
};

const expandTree = (async, node, depth) => {
  let c, children, _i, _len, _results;
  if (depth === 0) {
    return;
  }
  node.set('requestReload', true);
  children = node.get('children');
  if (children && 'function' === typeof children.then) {
    return children.then(
      (() => {
        return (loadedChildren) => {
          return loadedChildren.forEach((c) => {
            return expandTree(async, c, depth - 1);
          });
        };
      })(this)
    );
  } else {
    if (async) {
      // Do nothing.
    } else {
      if (!children || children.get('length') === 0 || depth === 0) {
        return;
      }
      _results = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        c = children[_i];
        _results.push(expandTree(async, c, depth - 1));
      }
      return _results;
    }
  }
};

/**
 * A tree component
 *
 * @class Tree
 */
export default Component.extend(WithConfigMixin, {
  tagName: 'ul',
  layoutName: 'em-tree',
  classNameBindings: ['styleClasses'],
  styleClasses: computed('', {
    get() {
      let _ref = this.get('config.tree.classes');
      return _ref != null ? _ref.join(' ') : '';
    },
  }),

  // eslint-disable-next-line ember/no-observers
  valuesChanged: observer('expand-depth', 'model', () => {
    this.expandTreeIfNeeded();
  }),

  init() {
    this._super();
    this.set('multi-selection', A());
    this.expandTreeIfNeeded();
  },

  expandTreeIfNeeded() {
    let depth = 0;
    if (!this.get('model')) {
      return;
    }
    if (this.get('expand-depth')) {
      depth = parseInt(this.get('expand-depth'));
      if (depth === 0) {
        return;
      }
      return expandTree(this.get('async'), this.get('model'), depth);
    }
  },

  /*
   * An array that contains the hovered actions to be triggered per node
   * i.e:
   * actionsMeta: [
   *    {classes: ['fa fa-eye'], action: 'eye', types: ['x', 'y']}
   *    {classes: ['fa fa-edit'], action: 'edit'}
   *    {classes: ['fa fa-trash-o'], action: 'delete'}
   * ]
   */
  'hovered-actions': undefined,

  /*
   * An object that contains meta info about each node type's icons
   * i.e:
   *    {
   *    type0: {
   *        nodeOpenIconClasses: ['fa-li', 'fa', 'fa-minus-square-o']
   *        nodeCloseIconClasses: ['fa-li', 'fa', 'fa-plus-square-o']
   *    },
   *    type1: {
   *        nodeOpenIconClasses: ['fa-li', 'fa', 'fa-tag']
   *        nodeCloseIconClasses: ['fa-li', 'fa', 'fa-tags']
   *    }
   *    }
   */
  'icons-per-type': undefined,

  /**
   * The model to render as the root node of the tree
   * this property is expected to be defined by the user
   */
  model: undefined,

  /**
   * True if node's children should be loaded asynchronously
   * This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
   * branch being opened
   */
  async: false,

  'in-multi-selection': false,
  'multi-selection': undefined,
  'selected-icon': 'fa fa-check',
  'unselected-icon': 'fa fa-times',
  'expand-depth': null,
  'refresh-expanded': false,

  // eslint-disable-next-line ember/no-observers
  observeRefreshExpanded: observer('refresh-expanded', function () {
    // DO nothing
  }),

  actions: {
    requestChildren() {
      // wrap it into promise
      return this.children(...arguments);
    },
  },
});
