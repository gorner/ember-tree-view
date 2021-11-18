import WithConfigMixin from 'ember-tree-utils/mixins/with-config';
import Component from '@ember/component';
import { action, computed, set } from '@ember/object';
import { observes } from '@ember-decorators/object';
import classic from 'ember-classic-decorator';
import { tagName, className } from '@ember-decorators/component';
import { A } from '@ember/array';
import { run } from '@ember/runloop';

function expandTree(async, node, depth) {
  if (depth > 0 && node) {
    set(node, 'requestReload', true);
    // Key part to allow oberves works
    node.notifyPropertyChange('requestReload');

    const children = node.children;

    // Check if the function is promise or not
    if (children && 'function' === typeof children.then) {
      return children.then(
        (() => {
          return (loadedChildren) => {
            return loadedChildren.forEach((item) => {
              return expandTree(async, item, depth - 1);
            });
          };
        })(this)
      );
    } else {
      if (!async) {
        return children?.map((item) => {
          expandTree(async, item, depth - 1);
        });
      }
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
    set(this, 'multi-selection', A());
    this.expandTreeIfNeeded();
  }

  expandTreeIfNeeded() {
    if (this.model && this['expand-depth'] > 0) {
      return expandTree(this.async, this.model, this['expand-depth']);
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
  'selected-icon' = 'check';
  'unselected-icon' = 'times';
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
    if (this.children) {
      return this.children(...arguments);
    }
  }
}
