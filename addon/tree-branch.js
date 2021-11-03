import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import WithConfigMixin from 'ember-tree-utils/mixins/with-config';

/**
 * A branch of a tree.
 *
 * @class TreeBranch
 */
@classic
export default class TreeBranch extends Component.extend(WithConfigMixin) {
  /**
   * The model to render its children within this branch
   * this property is set during component markup creation
   */
  model = undefined;

  /**
   * A list of {{#crossLink "TreeNode"}}nodes{{/crossLink}} instances.
   */
  @alias('model.children')
  items;

  /**
   * True if node's children should be loaded asynchronously
   * This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
   * branch being opened
   */
  async = false;

  layoutName = 'em-tree-branch';

  @computed('config.tree.branchClasses')
  get styleClasses() {
    const _ref = this.config.tree.branchClasses;
    return _ref?.join(' ') ?? void 0;
  }

  @action
  requestChildren() {
    // resend event
    return this.children(...arguments);
  }
}
