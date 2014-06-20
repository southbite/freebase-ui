freebase_ui_app.controller('new_object', ['$scope', '$modalInstance', 'dataService', function($scope, $modalInstance, dataService) {

	  $scope.message = {type:'alert-warning', message:'', display:'none'};
	  $scope.data = {path:'', data:[]}; 

	  $scope.settings = {template:{path:'None'}, typ:'object', types:['object','array']};


	  var cleanTemplate = function(templateData){

	  	templateData.map(function(item, index, array){

	  		if (item['_id'])
	  			delete item['_id'];

	  	});

		console.log('templateData cleaned');
	  	console.log(templateData);

	  	return templateData;

	  }

	  var checkPath = function(path){

	  				if (path == '' || path.length < 10)
	  					return 'Path must be at least 10 characters long';

					if (path.match(/[.\\:@]$/))
						return 'Bad path, cannot contain characters .\\:@';

					return 'ok';
		
	  };

	   dataService.instance.client.get('/freebase/templates/*', null, function(e, results){

	   	   results.data.push({path:'None'});

           $scope.templates = results.data;
           $scope.$apply();

           $scope.ok = function () {
				var okToSave = false;

				var pathCheck = checkPath($scope.data.path);

				if (pathCheck != 'ok')
					showMessage('alert-warning', pathCheck);
				else
					okToSave = true;

				if (okToSave){
					console.log($scope);
					
					if ($scope.settings.template && $scope.settings.template.path != 'None')
						$scope.data.data = cleanTemplate($scope.settings.template.data);
					else
					{
						if ($scope.settings.typ == 'object')
							$scope.data.data = {};
						else 
							$scope.data.data = [];
					}

					console.log('$scope.data.data');
					console.log($scope.data.data);

					dataService.instance.client.set($scope.data.path, $scope.data.data, null, function(e, result){

						if (!e){
							$modalInstance.close(result.data);
						}else
							showMessage('alert-warning', 'Failed saving new array: ' + e);

					});
				}
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

        });

	  var showMessage = function(type, message){
		  $scope.message.type = type;
		  $scope.message.message = message;
		  $scope.message.display = 'block';
	  };
	  
	  
	  
	  
}]);