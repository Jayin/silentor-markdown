var marked = require('./lib/marked');
var fs = require('fs');
var mkdirp = require('mkdirp')
var config = require('./config');
var walker = require('./lib/filewalker');
var path = require('path');
var render = require('./lib/render');
var poster = require('./lib/poster');

//config
var input_folder = config.input_folder;
var output_folder = config.output_folder;


console.log(input_folder);
console.log(output_folder);

// clean up output folder
if (fs.existsSync(output_folder)) {
	console.log("start to clean output folder");
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
	console.log("clean up finished");
}


function md2html(input_file, output_file, callback) {
	if (fs.existsSync(input_file)) {

		//marked
		var content = marked(fs.readFileSync(input_file, 'UTF-8'));
		//render
		var render_content = render.render(config.template_file, {
			'title': config.blog_name,
			'content': content,
			'post_title':poster.build(input_file).post_title,
			'post_time' :poster.build(input_file).post_time
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

var items = [];
//md -> html
walker.walkSync(input_folder, function(current_path, dirs, names) {
	names.forEach(function(element, index, array) {
		// var input_file = current_path + path.sep + element;
		var input_file = current_path + path.sep + element;
		var output_file = input_file.replace(input_folder, output_folder).replace('md', 'html');
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

		items.push(poster.build(output_file));
	});
});

//sort with post time
items.sort(function (a,b){
	if(a.year < b.year)
		return 1;
	if(a.month < b.month)
		return 1;
	if(a.day < b.day)
		return 1;
	return 0;

});
 

// console.log(posts);

function generateHomePage(items) {

	var posts = '';
	items.forEach(function(element, index) {
		posts += render.render(config.template_item, element);
	});

	// items.forEach(function(e){console.log(e)});
	// console.log(posts);
	var home_content = render.render(config.template_home, {
		"blog_name": config.blog_name,
		"description": config.description,
		"title": config.blog_name,
		"posts": posts
	});
	// console.log(home_content);
	fs.writeFileSync('./index.html', home_content, 'UTF-8');
}

function genAboutPage() {
	var md = marked(fs.readFileSync(config.about, 'UTF-8'));
	fs.writeFileSync('./about.html', render.render(config.template_about, {
		"blog_name": config.blog_name,
		"description": config.description,
		"title": config.blog_name,
		"content":md
	}), 'UTF-8');
}

generateHomePage(items);
genAboutPage();