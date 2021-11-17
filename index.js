/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {
  name: require('./package').name,

  blueprintsPath: function () {
    return path.join(__dirname, 'blueprints');
  },
};
