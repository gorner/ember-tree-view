/*jshint node:true*/
module.exports = {
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    return this.addAddonToProject('ember-font-awesome'); 
  }
};
