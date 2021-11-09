import Route from '@ember/routing/route';
import { next } from '@ember/runloop';

export default {
  name: 'hightlightjs',
  initialize: function () {
    return Route.reopen({
      renderTemplate: function () {
        this._super(...arguments);
        return next(this, function () {});
      },
    });
  },
};
