module.exports = function(config) {

	var
		http = require("http"),
		express = require("express"),
		multer = require("multer"),
		Promise = require("bluebird");
		app = express();

	app.use("/uploads", multer({
		dest: config.uploadsFolder,
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));

	app.use(express.static(config.wwwFolder));

	return new Promise(function(resolve, reject) {

		http.createServer(app).listen(config.port, function(err) {

			if (err) {
				reject({
					port: config.port,
					err: err
				});
			} else {
				resolve({
					port: config.port
				});
			}

		});

	});


};
