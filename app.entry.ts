import * as angular from 'angular';
require('angular-gettext');

angular.module('more.ehr.member', ['gettext'])
.directive("moreApplication", function(gettext) {
  return {
    template: require('./test.jade'),
    link: function() {
      console.log('directive!');
      var t = gettext("Another Test 2!");
    }
  }
});