module.exports = function(grunt) {

	grunt.initConfig({

		webServer: {
			wwwFolder: "app/www",
			uploadsFolder: "app/uploads",
			port: 8080
		},
		sass: {
			dist: {
				files: {
					"app/www/css/site.css": "sass/site.scss"
				}
			}
		},
		cssmin: {
			target: {
				files: {
					"app/www/css/site.min.css": ['app/www/css/*.css', '!app/www/css/*.min.css']
				}
			}
		},
		uglify: {
			target: {
				files: {
					"app/www/js/site.min.js": ['app/www/js/*.js','!app/www/js/*.min.js']
				}
			}
		},
		watch: {
			css: {
				files: "sass/*.scss",
				tasks: ["sass","cssmin"]
			},
			js: {
				files: ["app/www/js/*.js", "!app/www/js/*.min.js"],
				tasks: ["uglify"]
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

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

		//this.async();

	});

	grunt.registerTask("default", ["webserver","watch"]);


};
