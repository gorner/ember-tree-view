import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('gettingstarted');
  this.route('simple');
  this.route('async');
  this.route('hoveredactions');
  this.route('expand');
  this.route('multiselection');
  this.route('noderefresh');
});
