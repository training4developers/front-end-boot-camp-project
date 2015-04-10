module.exports = function(grunt) {

	grunt.initConfig({

		webServer: {
			wwwFolder: "app/www",
			uploadsFolder: "app/uploads",
			port: 8080
		}

	});

	grunt.loadNpmTasks("grunt-contrib-sass");

	grunt.registerTask("webserver", "start web server", function() {

		var
			webServer = require("./app/web-server"),
			webServerConfig = grunt.config("webServer");

		webServer(webServerConfig)
			.then(function(result) {
				grunt.log.writeln("web server started on port " + result.port);
			})
			.catch(function(result) {
				grunt.log.writeln("failed to start web server on port " + result.port);
				grunt.log.writeln("error: " + result.error);
			});

		this.async();

	});

	grunt.registerTask("default", ["webserver"]);


};
