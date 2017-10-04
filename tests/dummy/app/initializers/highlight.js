/* global $ */
import Em from 'ember';
import hightlightjs from "highlightjs";

export default {
  name: 'hightlightjs',
  initialize: function() {
    return Em.Route.reopen({
      renderTemplate: function() {
        this._super();
        return Em.run.next(this, function() {
          return $('pre code').each(function(i, e) {
            return hightlightjs.highlightBlock(e);
          });
        });
      }
    });
  }
};
