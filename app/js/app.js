'use strict';

/* App Module */

//var ideControllers = angular.module('ideControllers', []);

console.log('registering app');

var freebase_ui_app = angular.module('freebase_ui_app', [  
  'ui.bootstrap',                                            
  'ngAnimate',
  'freebase'
]);

var registerDataService = function (serviceName) {
	freebase_ui_app.factory(serviceName, function (freebaseClient) {
        var _freebase = null;
        
        return {
            instance:freebaseClient,
            init: function (host, port, secret, done) {
            	freebaseClient.connect(host, port, secret, done);
            },
            traverse:function(data, path, done){
            	try
            	{
            		var currentNode = data;
            		var found = false;
            		
            		if (path[0] = '/')
            			path = path.substring(1, path.length);
            	
                	path.split('/').map(function(current, index, arr){
                		currentNode = currentNode[current];
                		if (index + 1 == arr.length && currentNode){
                			found = true;
                			done(null, currentNode);
                		}
                	});
                	
                	if (!found)
                		done(null, null);
            	}catch(e){
            		done(e);
            	}
            	
            }
        };
    });
};

registerDataService('dataService');

freebase_ui_app.factory('AppSession', function($rootScope) {
	  return {
		freebaseURL: 'http://127.0.0.1:8000',
		//currently what path are we editing
	    currentPath: '/'
	   };
	});

freebase_ui_app.controller('freebaseController', ['$scope', 'dataService', function($scope, dataService) {

    $scope.rootPaths = [];

    dataService.init('127.0.0.1', 8000, 'freebase-ui-secret', function(e){

        console.log('client attached?');
       
        dataService.instance.client.getAll('/*', null, function(e, results){

            console.log(results.data);
            $scope.rootPaths = results.data;

            $scope.$apply();

        });

    });

}]);

