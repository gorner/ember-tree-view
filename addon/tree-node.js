import Ember from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixins/with-config';
var getProperty;

var getProperty = function(obj, prop) {
  if (!obj) {
    return;
  }
  if (Ember.typeOf(obj) === 'instance' || Ember.canInvoke(obj, 'get')) {
    return obj.get(prop);
  } else {
    return obj[prop];
  }
};

/**
 * A node of a tree.
 *
 * @class TreeNode
 */

export default Ember.Component.extend(WithConfigMixin, {
  attributeBindings: ['multi-selected'],

  /**
   * The model the tree node view is bound to
   */
  model: undefined,

  /**
   * A reference to the tree view, this property is auto set during component instantiation
   */
  tree: undefined,

  /**
   * A reference to the root model
   */
  rootModel: Ember.computed.alias('tree.model'),

  /**
   * True if the node is currently expanded, meaning its children are visible.
   */
  expanded: Ember.computed.alias('model.expanded'),

  /**
   * True if this node view is currently checked
   * This is only relevant if the tree configured to support multi selection
   */
  'multi-selected': Ember.computed.alias('model.selected'),

  /**
   * True if should render an icon tag for this node view
   */
  hasIcon: true,

  /**
   * True if this node can be single selected
   */
  selectable: true,

  /**
   * True if this node is currently single selected
   */
  isSelected: Ember.computed('tree.selected', {
    get() {
      return this.get('tree.selected') === this.get('model');
    }
  }),

  /**
   * True if this node is currently loading,
   * Usually that means the node is defined asynchronously and its children are currently being loaded
   */
  loading: false,
  branch: Ember.computed.alias('parentView'),

  /**
   * true if the loading mode of the node's children should be async
   */
  async: Ember.computed.alias('parentView.async'),

  /**
   * true if this is a leaf node, meaning it has no children
   */
  leaf: Ember.computed('model.children.length', {
    get() {
      return !this.get('model.children') || this.get('model.children.length') === 0;
    }
  }),

  tagName: 'li',

  classNameBindings: ['styleClasses', 'expandedClasses', 'leafClasses'],

  styleClasses: Ember.computed("", {
    get() {
      var _ref;
      return (_ref = this.get('config.tree.nodeClasses')) != null ? _ref.join(" ") : void 0;
    }
  }),

  expandedClasses: Ember.computed('expanded', 'leaf', 'loading', {
    get() {
      var _ref, _ref1;
      if (this.get('expanded')) {
        return (_ref = this.get('config.tree.nodeOpenClasses')) != null ? _ref.join(" ") : void 0;
      } else {
        return (_ref1 = this.get('config.tree.nodeCloseClasses')) != null ? _ref1.join(" ") : void 0;
      }
    }
  }),

  nodeSelectedClasses: Ember.computed('isSelected', {
    get() {
      var _ref;
      if (this.get('isSelected')) {
        return (_ref = this.get('config.tree.nodeSelectedClasses')) != null ? _ref.join(" ") : void 0;
      } else {
        return null;
      }
    }
  }),

  /*
   * Observes the 'multi-selected' and put the tree in multi selection mode if true
   */
  addMultiSelectionToTreeSelection: Ember.on("init", Ember.observer('multi-selected', function() {
    if (this.get('multi-selected')) {
      return this.get('tree.multi-selection').pushObject(this.get('model'));
    } else {
      return this.get('tree.multi-selection').removeObject(this.get('model'));
    }
  })),

  iconClass: Ember.computed('expanded', 'leaf', 'loading', {
    get() {
      var icons;
      icons = [];
      if (this.get('async')) {
        if (this.get('loading')) {
          icons = icons.concat(this.iconFromModelOrDefault('nodeLoadingIconClasses'));
        } else if (!this.get('model.children')) {
          icons = this.iconFromModelOrDefault('nodeCloseIconClasses');
        } else {
          if (this.get('model.children.length') === 0) {
            icons = icons.concat(this.iconFromModelOrDefault('nodeLeafIconClasses'));
          } else {
            icons = this.get('expanded') ? icons.concat(this.iconFromModelOrDefault('nodeOpenIconClasses')) : icons.concat(this.iconFromModelOrDefault('nodeCloseIconClasses'));
          }
        }
      } else {
        if (this.get('leaf')) {
          icons = icons.concat(this.get('config.tree.nodeLeafIconClasses'));
        } else {
          icons = this.get('expanded') ? icons.concat(this.iconFromModelOrDefault('nodeOpenIconClasses')) : icons.concat(this.iconFromModelOrDefault('nodeCloseIconClasses'));
        }
      }
      return icons.join(" ");
    }
  }),

  leafClasses: Ember.computed("leaf", {
    get() {
      var _ref;
      if (this.get('leaf')) {
        return (_ref = this.get('config.tree.nodeLeafClasses')) != null ? _ref.join(" ") : void 0;
      }
    }
  }),

  hoveredActions: Ember.computed('tree.hoveredActions', 'model.nodeType', {
    get() {
      var globalHoveredActions, nodeType, types;
      globalHoveredActions = this.get('tree.hovered-actions');
      nodeType = this.get('model.nodeType');
      types = [];
      if (nodeType) {
        globalHoveredActions.forEach(function(ha) {
          if (!getProperty(ha, 'types') || !getProperty(ha, 'types').length) {
            return types.push(ha);
          } else {
            if (getProperty(ha, 'types').contains(nodeType)) {
              return types.push(ha);
            }
          }
        });
        return types;
      } else {
        return globalHoveredActions;
      }
    }
  }),

  /*
   * Observes the 'model.requestReload' property, if set to true, the node's children will get reloaded
   */
  observeRequestReload: Ember.on("init", Ember.observer('model.requestReload', function() {
    if (this.get('model.requestReload')) {
      this.set('model.requestReload', false);
      this.send('reloadChildren');
      return this.set('model.expanded', true);
    }
  })),

  /*
   * Get the icon for the model, if set by the tree icon's metadata, otherwise use defaults configured by the tree level.
   */
  iconFromModelOrDefault(iconConfigName) {
    var iconsPerType, nodeType;
    nodeType = this.get('model.nodeType');
    iconsPerType = this.get('tree.icons-per-type');
    if (nodeType && iconsPerType && iconsPerType[nodeType] && iconsPerType[nodeType][iconConfigName]) {
      return iconsPerType[nodeType][iconConfigName];
    } else {
      return this.get('config.tree')[iconConfigName];
    }
  },
  actions: {

    /*
     * Expand or close the current node's children
     */
    toggle() {
      if (this.get('async') && !this.get('expanded') && !this.get('model.children')) {
        this.set('loading', true);
        return this.sendAction('children', this.get('model'), this);
      } else {
        return this.toggleProperty('expanded');
      }
    },

    /*
     * Reload the model's children
     */
    reloadChildren() {
      if (this.get('async')) {
        return this.sendAction('children', this.get('model'), this);
      }
    },
    select() {
      if (!this.get('selectable')) {
        return;
      }
      return this.set('tree.selected', this.get('model'));
    },
    toggleSelection() {
      if (this.get('multi-selected')) {
        return this.set('multi-selected', '');
      } else {
        return this.set('multi-selected', 'true');
      }
    }
  },

  /*
   * The name of the method to invoke in async mode to get the children of a node when expanded
   */
  children: 'getChildren',
  loadingHasChanged: Ember.observer("loading", function() {
    if (!this.get('loading')) {
      return this.toggleProperty('expanded');
    }
  })

});
