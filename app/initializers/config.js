import Em from '@ember/engine';
import Config from 'ember-tree-utils/config'

export default {
  name: 'ember-tree-view',
  _config: Config.create(),
  initialize() {
    let config = this._config;
    if (!Em.Config) {
      Em.Config = config;
    }

    let defaultConfig = config.getConfig('default');
    if (!defaultConfig) {
      config.addConfig('default');
      defaultConfig = config.getConfig('default');
    }

    defaultConfig['tree'] = {
      classes: ['em-tree-branch', 'em-tree', 'fa-ul'],
      branchClasses: ['em-tree-branch', 'fa-ul'],
      nodeClasses: ['em-tree-node'],
      nodeOpenClasses: [],
      nodeCloseClasses: [],
      nodeOpenIconClasses: ['fa-li', 'fa', 'fa-minus-square-o'],
      nodeCloseIconClasses: ['fa-li', 'fa', 'fa-plus-square-o'],
      nodeLeafClasses: ['leaf'],
      nodeLeafIconClasses: ['fa-li', 'fa', 'fa-square-o'],
      nodeLoadingIconClasses: ['fa-li', 'fa', 'fa-spinner', 'fa-spin'],
      nodeSelectedClasses: ['em-tree-node-active']
    }
  }
};
