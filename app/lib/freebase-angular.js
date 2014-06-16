(function(window, angular, undefined) {'use strict';
console.log('registering freebase');

if (!FreebaseBrowserClient)
   throw 'Freebase browser client library not referenced';

angular.module('freebase', [])

.factory('freebaseClient', ['$window', function(win) {
 return {
      connect:function(host, port, secret, done){
            var _this = this;
            
            win.FreebaseBrowserClient.newClient({host:host, port:port, secret:secret}, function(e, client){

               if (!e)
                  _this.client = client;

               done(e);

            });

      },
      attach:function(path, scope, localScopeVarName){

      }
   }
}])

/*
.controller('freebaseController', ['$scope', 'freebaseClient', function($scope, freebaseClient) {

}]);
*/

console.log('registered freebase');

})(window, window.angular);

