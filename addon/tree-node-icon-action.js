import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import StyleBindingsMixin from 'ember-tree-utils/mixins/style-bindings';
import WithConfigMixin from 'ember-tree-utils/mixins/with-config';
/**
 * An icon action of a tree node
 * @class TreeNodeIconAction
 */

@classic
@tagName('span')
export default class TreeNodeIconAction extends Component.extend(
  WithConfigMixin,
  StyleBindingsMixin
) {
  //('stickyMode:sticky')
  layoutName = 'em-tree-node-icon-action';

  /**
   * Bind the visibility css property,
   * this is required for the `sticky` property
   * @property styleBindings
   * @private
   */
  styleBindings = ['visibility'];

  @alias('meta.name')
  iconName;

  @computed('meta.classes')
  get iconClass() {
    return this.meta?.classes?.join(' ');
  }
  /**
   * Defines the css visibility according to the value of the `sticky` property
   * @property visibility
   * @private
   */
  @computed('sticky')
  get visibility() {
    return this.sticky ? 'visible' : null;
  }

  /**
   * 'true' if the action icon should be sticky and not disappear when item is not hovered
   * @property sticky
   * @public
   */
  sticky = false;

  @computed('sticky')
  get stickyMode() {
    return this.sticky ? 'true' : null;
  }

  init() {
    super.init();
  }

  /**
   * Invoked when the action is clicked
   * @method invoke
   */
  @action
  invoke() {
    this.meta?.action(this);
  }
}
