import WithConfigMixin from 'ember-tree-utils/mixins/with-config';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { observes } from '@ember-decorators/object';
import classic from 'ember-classic-decorator';
import { tagName, className } from '@ember-decorators/component';

/*
function refreshExpanded(node) {
  let children;
  if (node.get('expanded')) {
    node.set('requestReload', true);
  }
  children = node.get('children');
  if (children && children.length) {
    return refreshExpanded(children);
  }
}
*/

function expandTree(async, node, depth) {
  if (depth === 0 || node == null) {
    return;
  }

  let c, children;

  node.set('requestReload', true);

  children = node.children;

  // Check if the function is promise or not
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
      if (!children || children.length === 0 || depth === 0) {
        return;
      }
      const _results = [];
      children.forEach((item) => {
        c = item;
        _results.push(expandTree(async, c, depth - 1));
      });
      return _results;
    }
  }
}

/**
 * A tree component
 *
 * @class Tree
 */
@classic
@tagName('ul')
export default class EmTree extends Component.extend(WithConfigMixin) {
  layoutName = 'em-tree';

  @className
  @computed('config.tree.classes')
  get styleClasses() {
    const _ref = this.config.tree.classes;
    return _ref != null ? _ref.join(' ') : '';
  }

  // eslint-disable-next-line ember/no-observers
  @observes('expand-depth', 'model')
  valuesChanged() {
    this.expandTreeIfNeeded();
  }

  init(...args) {
    super.init(...args);
    this.set('multi-selection', []);
    this.expandTreeIfNeeded();
  }

  expandTreeIfNeeded() {
    let depth = 0;
    if (!this.model) {
      return;
    }
    if (this['expand-depth']) {
      depth = parseInt(this['expand-depth']);
      if (depth === 0) {
        return;
      }
      return expandTree(this.async, this.model, depth);
    }
  }

  /*
   * An array that contains the hovered actions to be triggered per node
   * i.e:
   * actionsMeta: [
   *    {classes: ['fa fa-eye'], action: 'eye', types: ['x', 'y']}
   *    {classes: ['fa fa-edit'], action: 'edit'}
   *    {classes: ['fa fa-trash-o'], action: 'delete'}
   * ]
   */
  'hovered-actions' = undefined;

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
  'icons-per-type';

  /**
   * The model to render as the root node of the tree
   * this property is expected to be defined by the user
   */
  model;

  /**
   * True if node's children should be loaded asynchronously
   * This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
   * branch being opened
   */
  async = false;

  'in-multi-selection' = false;
  'multi-selection' = undefined;
  'selected-icon' = 'fa fa-check';
  'unselected-icon' = 'fa fa-times';
  'expand-depth' = null;
  'refresh-expanded' = false;

  // eslint-disable-next-line ember/no-observers
  @observes('refresh-expanded')
  observeRefreshExpanded() {
    // DO nothing
  }

  @action
  requestChildren() {
    // wrap it into promise
    return this.children(...arguments);
  }
}
