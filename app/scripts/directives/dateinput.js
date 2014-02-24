'use strict';

angular.module('splitItApp')
.directive('dateInput', function () {
  return {
    template: '<input type="date"></input>',
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    scope: {},
    link: function postLink(scope, element, attrs, ngModelCtrl) {

      if(!ngModelCtrl) return;

      // When view is updated, send model a timestamp version of the date
      ngModelCtrl.$parsers.push(function( dateStr ){
        var date = dateCorrected( dateStr );
        if( isValidDate(date) ){
          ngModelCtrl.$setValidity('date', true);
          return date.getTime();
        } else {
          ngModelCtrl.$setValidity('date', false);
        }
      });

      // When model is updated, convert timestamp into date input frendly string
      ngModelCtrl.$formatters.push(function( timestamp ){
        if( typeof timestamp !== 'undefined' ){
          return new Date(timestamp).yyyymmdd();
        }
      });

      /**
       * Check for a valid date
       * @param  {Date}  d 
       * @return {Boolean}
       */
      function isValidDate(d) {
        if ( Object.prototype.toString.call(d) !== '[object Date]' ){
          return false;
        }
        return !isNaN(d.getTime());
      }

      /**
       * Accounts for timezone in a provided dateStr
       * @param  {str} dateStr
       * @return {Date} 
       */
      function dateCorrected( dateStr ){
        var timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
        var timeStamp = new Date(dateStr).getTime();
        var correctedDate = new Date( timeStamp + timezoneOffset );
        return correctedDate; 
      }

      /**
       * Format a date object in a friendly way for the date input
       * @return {str} YYYY-MM-DD
       */
      Date.prototype.yyyymmdd = function() {
       var yyyy = this.getFullYear().toString();
       var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
       var dd  = this.getDate().toString();
       return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
      };

    }
  };
});
