var marked = require('./lib/marked');
var fs = require('fs');
var mkdirp = require('mkdirp')
var config = require('./config');
var walker = require('./lib/filewalker');
var path = require('path');
var render = require('./lib/render');

//config
var input_folder = config.input_folder;
var output_folder = config.output_folder;


console.log(input_folder);
console.log(output_folder);

// clean up output folder
if (fs.existsSync(output_folder)){
	deleteFolderRecursive = function(path) {
		var files = [];
		if (fs.existsSync(path)) {
			files = fs.readdirSync(path);
			files.forEach(function(file, index) {
				var curPath = path + "/" + file;
				if (fs.statSync(curPath).isDirectory()) { // recurse
					deleteFolderRecursive(curPath);
				} else { // delete file
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	};
	deleteFolderRecursive(output_folder);
}


function md2html(input_file, output_file, callback) {
	if (fs.existsSync(input_file)) {

		//marked
		var content = marked(fs.readFileSync(input_file, 'UTF-8'));
		//render
		var render_content = render.render(config.template_file, {
			'title': config.blog_name,
			'content': content
		})

		fs.writeFileSync(output_file, render_content, 'UTF-8');

		if (callback !== undefined && typeof callback === 'function') {
			callback(null, content);
		}
	} else {
		if (callback !== undefined && typeof callback === 'function') {
			callback(new Error('File is not exist'));
		}
	}
}

walker.walkSync(input_folder, function(current_path, dirs, names) {
	names.forEach(function(element, index, array) {
		// var input_file = current_path + path.sep + element;
		var input_file = current_path + path.sep + element;
		var output_file = input_file.replace(input_folder, output_folder).replace('md','html');
		var tmp_output_folder = current_path.replace(input_folder, output_folder)

		if (!fs.existsSync(tmp_output_folder))
			mkdirp.sync(tmp_output_folder);

		// console.log(current_path + '-->'+ tmp_output_folder);
		// console.log(input_file +'-->'+output_file);
		md2html(input_file, output_file, function(err, content) {
			if (err)
				console.log(err);
			// else
			// 	console.log(content);
		});


	});
});