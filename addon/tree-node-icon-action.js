import Component from '@ember/component';
import StyleBindingsMixin from 'ember-tree-utils/mixins/style-bindings';
import WithConfigMixin from 'ember-tree-utils/mixins/with-config';
import { computed } from '@ember/object';
/**
 * An icon action of a tree node
 * @class TreeNodeIconAction
 */

export default Component.extend(WithConfigMixin, StyleBindingsMixin, {
  attributeBindings: ['stickyMode:sticky'],

  /**
   * The tag name of the icon action,
   * default is `<i>` but can be replaced with any tag.
   * @property tagName
   * @public
   */
  tagName: 'i',

  /**
   * Bind the visibility css property,
   * this is required for the `sticky` property
   * @property styleBindings
   * @private
   */
  styleBindings: 'visibility',

  /**
   * Defines the css visibility according to the value of the `sticky` property
   * @property visibility
   * @private
   */
  visibility: computed("sticky", {
    get() {
      if (this.get('sticky')) {
        return 'visible';
      } else {
        return void 0;
      }
    }
  }),

  /**
   * 'true' if the action icon should be sticky and not disappear when item is not hovered
   * @property sticky
   * @public
   */
  sticky: false,
  stickyMode: computed("sticky",{
    get() {
      if (this.get('sticky')) {
        return 'true';
      } else {
        return void 0;
      }
    }
  }),

  /**
   * Binds the specified css classes
   * @property classNameBindings
   * @private
   */
  classNameBindings: ['iconClasses'],

  init() {
    this._super();
    this.on("click", () => {
      this.invoke();
    });
  },

  /**
   * Set the given array of classes
   * @property iconClasses
   * @private
   */
  iconClasses: computed("meta.classes", {
    get() {
      let _ref;
      return (_ref = this.get('meta.classes')) != null ? _ref.join(" ") : void 0;
    }
  }),

  /**
   * An alias to the node model of this action
   * @property node
   * @public
   */
  node: computed("", {
    get() {
      return this.get('parentView.node');
    }
  }).volatile(),

  /**
   * Invoked when the action is clicked
   * @method invokde
   */
  invoke() {
    return this.get('parentView.target').send(this.get('meta.action'), this);
  }
});
