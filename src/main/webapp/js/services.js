'use strict';

(function() {
var app = angular.module('portal.misc.service', []);

app.factory('miscService', function($http, $modal, $window, $location) {
  
  var redirectUser = function(status, caller) {
  	if(status === 0 || status === 302 || status === 404) {
  		//got a redirect call from shib due to session timeout or /web direct hit or not properly portal authenticated
  		console.log("redirect happening due to weird return status: " + status);
    	$('body').append("<form id='redirectForm' action='/portal/Login'><input type='hidden' name='profile' value='bucky'/></form>");
    	$('#redirectForm').submit();
    } else {
    	console.warn("Strange behavior from " + caller +". Returned status code : " + status);
    }
  }

  var pushPageview = function () {
    $window._gaq.push(['_trackPageview', $location.path()]);
  }

  var pushGAEvent = function(category, action, label) {
    $window._gaq.push(['_trackEvent', category, action, label]);
  }

  return {
    redirectUser: redirectUser,
    pushPageview: pushPageview,
    pushGAEvent : pushGAEvent
  }

});

})();
