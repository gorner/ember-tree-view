'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {

  let app = new EmberAddon(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 4,
      importBootstrapFont: false,
      importBootstrapCSS: false
    },
    svgJar: {
      sourceDirs: [
        'node_modules/flat-color-icons/svg',
      ]
    }
  });

  return app.toTree();
};
