import Em from '@ember/engine';
import Config from 'ember-tree-utils/config';

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
      nodeOpenIconName: 'minus',
      nodeOpenIconClasses: [],
      nodeCloseIconName: 'plus',
      nodeCloseIconClasses: [],
      nodeLeafClasses: ['leaf'],
      nodeLeafIconName: 'leaf',
      nodeLeafIconClasses: [],
      nodeLoadingIconName: 'spinner',
      nodeLoadingIconClasses: [],
      nodeSelectedClasses: ['em-tree-node-active'],
    };
  },
};
