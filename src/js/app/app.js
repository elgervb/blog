/* global angular */
angular.module('blogapp', ['ui.router', 'templates', 'blog', 'blog.admin'])

/**
 * Configuration: state your routes and other configuration items here
 */
.config(($httpProvider, $locationProvider) => {
  
  // CSRF protection
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    
  $locationProvider.html5Mode('true');
})

.constant('BaseUrl', '/blog/server/api'); // proxy to http://localhost:4011 in gulpfile in devmode
