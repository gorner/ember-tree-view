import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route( 'gettingstarted' );
    this.route( 'simple' );
    this.route( 'emberdata' );
    this.route( 'async' );
    this.route( 'hoveredactions' );
    this.route( 'expand' );
    this.route( 'multiselection' );
    this.route( 'noderefresh' );
});

export default Router;
