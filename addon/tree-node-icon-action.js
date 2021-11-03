import classic from 'ember-classic-decorator';
import { attributeBindings, classNameBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import StyleBindingsMixin from 'ember-tree-utils/mixins/style-bindings';
import WithConfigMixin from 'ember-tree-utils/mixins/with-config';
/**
 * An icon action of a tree node
 * @class TreeNodeIconAction
 */

@classic
@attributeBindings('stickyMode:sticky')
@tagName('i')
@classNameBindings('iconClasses')
export default class TreeNodeIconAction extends Component.extend(WithConfigMixin, StyleBindingsMixin) {
  /**
   * Bind the visibility css property,
   * this is required for the `sticky` property
   * @property styleBindings
   * @private
   */
  styleBindings = 'visibility';

  /**
   * Defines the css visibility according to the value of the `sticky` property
   * @property visibility
   * @private
   */
  @computed("sticky")
  get visibility() {
    if (this.get('sticky')) {
      return 'visible';
    } else {
      return void 0;
    }
  }

  /**
   * 'true' if the action icon should be sticky and not disappear when item is not hovered
   * @property sticky
   * @public
   */
  sticky = false;

  @computed("sticky")
  get stickyMode() {
    if (this.get('sticky')) {
      return 'true';
    } else {
      return void 0;
    }
  }

  init() {
    super.init();
    this.on("click", () => {
      this.invoke();
    });
  }

  /**
   * Set the given array of classes
   * @property iconClasses
   * @private
   */
  @computed("meta.classes")
  get iconClasses() {
    let _ref;
    return (_ref = this.get('meta.classes')) != null ? _ref.join(" ") : void 0;
  }

  /**
   * An alias to the node model of this action
   * @property node
   * @public
   */
  @(computed("").volatile())
  get node() {
    return this.get('parentView.node');
  }

  /**
   * Invoked when the action is clicked
   * @method invokde
   */
  invoke() {
    return this.get('parentView.target').send(this.get('meta.action'), this);
  }
}
