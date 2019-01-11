import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
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
