import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import WithConfigMixin from 'ember-tree-utils/mixins/with-config';
import { action, computed } from '@ember/object';
import { observes } from '@ember-decorators/object';
import { resolve } from 'rsvp';
import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import { set } from '@ember/object';

/**
 * A node of a tree.
 *
 * @class TreeNode
 */
@classic
@attributeBindings('multi-selected')
export default class EmTreeNode extends Component.extend(WithConfigMixin) {
  layoutName = 'em-tree-node';
  @computed('config.tree.nodeClasses')
  get styleClasses() {
    const _ref = this.config.tree.nodeClasses;
    return _ref?.join(' ') ?? null;
  }

  @computed(
    'expanded',
    'leaf',
    'loading',
    'config.tree.{nodeOpenClasses,nodeCloseClasses}'
  )
  get expandedClasses() {
    var _ref, _ref1;
    if (this.expanded) {
      return (_ref = this.config.tree.nodeOpenClasses) != null
        ? _ref.join(' ')
        : void 0;
    } else {
      return (_ref1 = this.config.tree.nodeCloseClasses) != null
        ? _ref1.join(' ')
        : void 0;
    }
  }

  @computed('isSelected', 'config.tree.nodeSelectedClasses')
  get nodeSelectedClasses() {
    const _ref = this.config.tree.nodeSelectedClasses;
    return this.isSelected ? _ref?.join(' ') ?? null : null;
  }

  /**
   * The model the tree node view is bound to
   */
  model = undefined;

  /**
   * A reference to the tree view, this property is auto set during component instantiation
   */
  tree = undefined;

  /**
   * A reference to the root model
   */
  @alias('tree.model')
  rootModel;

  /**
   * True if the node is currently expanded, meaning its children are visible.
   */
  @alias('model.expanded')
  expanded;

  /**
   * Node icon per expanded
   */
  @computed('model.{nodeIcon,nodeExpandedIcon}', 'expanded')
  get nodeIcon() {
    if (this.expanded) {
      return this.model?.nodeExpandedIcon || this.model?.nodeIcon;
    }
    return this.model?.nodeIcon;
  }
  /**
   * True if this node view is currently checked
   * This is only relevant if the tree configured to support multi selection
   */
  @alias('model.selected')
  'multi-selected';

  /**
   * True if should render an icon tag for this node view
   */
  @computed('model')
  get hasIcon() {
    return this.model != null;
  }

  /**
   * True if this node can be single selected
   */
  selectable = true;

  /**
   * True if this node is currently single selected
   */
  @computed('tree.selected', 'model')
  get isSelected() {
    return this.tree.selected === this.model;
  }

  /**
   * True if this node is currently loading,
   * Usually that means the node is defined asynchronously and its children are currently being loaded
   */
  loading = false;

  @computed('parentView')
  get branch() {
    return this.parentView;
  }
  /**
   * true if the loading mode of the node's children should be async
   */
  @computed('parentView.node')
  get async() {
    return this.parentView.node;
  }

  /**
   * true if this is a leaf node, meaning it has no children
   */
  @computed('model.children.length')
  get leaf() {
    return this.model?.children?.length === 0;
  }

  @computed(
    'expanded',
    'leaf',
    'loading',
    'async',
    'model.children.length',
    'config.tree.nodeLeafIconClasses'
  )
  get iconName() {
    if (this.async) {
      if (this.loading) {
        return this.iconFromModelOrDefault('nodeLoadingIconName');
      }

      if (!this.model?.children) {
        return this.iconFromModelOrDefault('nodeCloseIconName');
      } else {
        if (this.model?.children.length === 0) {
          return this.iconFromModelOrDefault('nodeLeafIconName');
        } else {
          return this.expanded
            ? this.iconFromModelOrDefault('nodeOpenIconName')
            : this.iconFromModelOrDefault('nodeCloseIconName');
        }
      }
    } else {
      if (this.leaf) {
        return this.iconFromModelOrDefault('nodeLeafIconName');
      } else {
        return this.expanded
          ? this.iconFromModelOrDefault('nodeOpenIconName')
          : this.iconFromModelOrDefault('nodeCloseIconName');
      }
    }
  }

  @computed(
    'expanded',
    'leaf',
    'loading',
    'async',
    'model.children.length',
    'config.tree.nodeLeafIconClasses'
  )
  get iconClass() {
    let icons = [];
    if (this.async) {
      if (this.loading) {
        icons = icons.concat(
          this.iconFromModelOrDefault('nodeLoadingIconClasses')
        );
      } else if (!this.model.children) {
        icons = this.iconFromModelOrDefault('nodeCloseIconClasses');
      } else {
        if (this.model?.children.length === 0) {
          icons = icons.concat(
            this.iconFromModelOrDefault('nodeLeafIconClasses')
          );
        } else {
          icons = this.expanded
            ? icons.concat(this.iconFromModelOrDefault('nodeOpenIconClasses'))
            : icons.concat(this.iconFromModelOrDefault('nodeCloseIconClasses'));
        }
      }
    } else {
      if (this.leaf) {
        icons = icons.concat(
          this.iconFromModelOrDefault('nodeLeafIconClasses')
        );
      } else {
        icons = this.expanded
          ? icons.concat(this.iconFromModelOrDefault('nodeOpenIconClasses'))
          : icons.concat(this.iconFromModelOrDefault('nodeCloseIconClasses'));
      }
    }
    return icons.join(' ');
  }

  @computed('leaf', 'config.tree.nodeLeafClasses')
  get leafClasses() {
    const _ref = this.config.tree.nodeLeafClasses;
    return this.leaf ? _ref?.join(' ') ?? null : null;
  }

  @computed('tree.hovered-actions', 'model.nodeType')
  get hoveredActions() {
    const globalHoveredActions = this.tree['hovered-actions'];
    const nodeType = this.model.nodeType;
    return nodeType
      ? globalHoveredActions.filter((ha) => {
          const property = ha['types'];
          return property?.length || property?.includes(nodeType);
        })
      : globalHoveredActions;
  }

  // eslint-disable-next-line ember/no-on-calls-in-components, ember/no-observers
  @observes('multi-selected')
  observeMultiSelectedChang() {
    if (this['multi-selected']) {
      return this.tree['multi-selection'].pushObject(this.model);
    } else {
      return this.tree['multi-selection'].removeObject(this.model);
    }
  }

  // eslint-disable-next-line ember/no-on-calls-in-components, ember/no-observers
  @observes('model.requestReload')
  observeRequestLoadChange() {
    if (this.model.requestReload) {
      set(this.model, 'requestReload', false);
      this.send('reloadChildren');
      return set(this.model, 'expanded', true);
    }
  }

  /*
   * Get the icon for the model, if set by the tree icon's metadata, otherwise use defaults configured by the tree level.
   */
  iconFromModelOrDefault(iconConfigName) {
    const { nodeType } = this.model;
    const iconsPerType = this.tree['icons-per-type'];

    return (
      iconsPerType?.[nodeType]?.[iconConfigName] ??
      this.config.tree[iconConfigName]
    );
  }

  requestChildrenAsync() {
    this.set('loading', true);
    return resolve()
      .then(() => {
        return this.children(this.model);
      })
      .then(() => {
        this.set('loading', false);
      });
  }

  /*
   * Expand or close the current node's children
   */
  @action
  toggle() {
    if (this.async && !this.expanded && !this.model?.children) {
      this.requestChildrenAsync();
    } else {
      this.toggleProperty('expanded');
    }
  }

  /*
   * Reload the model's children
   */
  @action
  reloadChildren() {
    if (this.async) {
      this.requestChildrenAsync();
    }
  }

  @action
  select() {
    if (this.selectable) {
      return this.set('tree.selected', this.model);
    }
  }

  @action
  toggleSelection() {
    this.toggleProperty('multi-selected');
  }

  @action
  requestChildren() {
    return this.children(...arguments);
  }

  /*
   * The name of the method to invoke in async mode to get the children of a node when expanded
   */
  // eslint-disable-next-line ember/no-observers
  @observes('loading')
  loadingHasChanged() {
    if (!this.loading) {
      return this.toggleProperty('expanded');
    }
  }
}
