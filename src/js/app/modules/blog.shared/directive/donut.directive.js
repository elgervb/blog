/* global angular */
angular.module('blog.shared').directive('donut', () => {
  return {
    restrict: 'EA',
    scope: {
      progress: '=', // the percentage filled
      size: '=',
      fill: '=', // the color to fill the progress with
      fgcolor: '=', // the foreground color
      bgcolor: '='
    },
    link: (scope) => {
      scope.progress = scope.progress ? scope.progress : 0;
      scope.fill = scope.fill ? scope.fill : '#f05f3b';
      scope.fgcolor = scope.fgcolor ? scope.fgcolor : '#ffffff';
      scope.bgcolor = scope.bgcolor ? scope.bgcolor : '#EAEAEA';
      scope.size = scope.size ? scope.size : 70;
      
      // watch size AND progress
      scope.$watch('size+progress', () => {
        let unit = (Math.PI * 2) / 100;
        let startangle = 0;
        let endangle = scope.progress * unit - 0.00001; // - 0.00001 otherwise the path's begin and end will be the same...
        let sweep = 0;
        if (endangle - startangle > Math.PI) {
          sweep = 1;
        }
        scope.moveTo = {x: scope.size / 2, y: scope.size / 2};
        scope.lineTo = {x: (scope.size / 2) + (scope.size / 2) * Math.sin(startangle), y: (scope.size / 2) - (scope.size / 2) * Math.cos(startangle)};
        scope.arcTo = {
          x: scope.size / 2, 
          y: scope.size / 2, 
          x2: (scope.size / 2) + (scope.size / 2) * Math.sin(endangle), 
          y2: (scope.size / 2) - (scope.size / 2) * Math.cos(endangle), 
          sweep
        };
      });
      
    },
    template: `<svg ng-if="size" ng-attr-width="{{size}}" ng-attr-height="{{size}}" ng-attr-viewbox="0 0 {{size}} {{size}}">
                <circle ng-attr-cx="{{size/2}}" ng-attr-cy="{{size/2}}" ng-attr-r="{{size/2}}" fill="{{bgcolor}}" class="back"/>
                <path ng-attr-d="M {{moveTo.x}}, {{moveTo.y}} L {{lineTo.x}}, {{lineTo.y}} A {{arcTo.x}}, {{arcTo.y}} 0 {{arcTo.sweep}} 1 {{arcTo.x2}}, {{arcTo.y2}} Z" 
                  ng-attr-fill="{{fill}}" class="progress"></path>
                <circle ng-attr-cx="{{size/2}}" ng-attr-cy="{{size/2}}" ng-attr-r="{{size*.17}}" fill="{{fgcolor}}" class="front"></circle>
              </svg>`
  };
});
