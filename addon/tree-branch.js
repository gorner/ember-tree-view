import { computed } from '@ember/object';
import Component from '@ember/component';
import WithConfigMixin from 'ember-tree-utils/mixins/with-config';

/**
 * A branch of a tree.
 *
 * @class TreeBranch
 */

export default Component.extend(WithConfigMixin, {

  /**
   * The model to render its children within this branch
   * this property is set during component markup creation
   */
  model: undefined,

  /**
   * A list of {{#crossLink "TreeNode"}}nodes{{/crossLink}} instances.
   */
  items: computed.alias('model.children'),

  /**
   * True if node's children should be loaded asynchronously
   * This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
   * branch being opened
   */
  async: false,
  tagName: 'ul',
  layoutName: 'em-tree-branch',
  classNameBindings: ['styleClasses'],
  styleClasses: computed("", {
    get() {
      const _ref = this.get('config.tree.branchClasses');
      return _ref != null ? _ref.join(" ") : void 0;
    }
  }),

  actions: {
    requestChildren() {
      // resend event
      return this.children(...arguments);
    }
  }
});
