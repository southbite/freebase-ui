var freebase = require('freebase');
var service = freebase.service;

var port = 8000;

service.initialize({size:5, 
					port:port, 
					services:{
						auth:{authTokenSecret:'a256a2fd43bf441483c5177fc85fd9d3',
						systemSecret:'freebase-ui-secret'},
						utils:{log_level:'info|error|warning'}
			}}, 
		function(e){
			if (!e)
				console.log('Initialized freebase service on port ' + port);
			else
				console.log('Failed to initialize freebase service: ' + e);
});