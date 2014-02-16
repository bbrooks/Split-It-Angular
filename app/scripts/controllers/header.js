'use strict';

angular.module('splitItApp')
  .controller('HeaderCtrl', function ($scope, $location) {
        
        $scope.$location = $location;

        $scope.isNavbarActive = function (navBarPath) {
          var currentPath = $scope.$location.path();
          return navBarPath === currentPath;
        };

  });
