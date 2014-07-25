var fs = require('fs');
var P = require('./P');

//render.render('template_name',option)

module.exports.render = function(template_name, data) {
	if (fs.existsSync(template_name)) {
		var tmp_content = fs.readFileSync(template_name, 'UTF-8');
		var t = P.from(tmp_content);
		for (var attr in data) {
			if (typeof(data[attr]) === 'string') {
				t.put(attr, data[attr]);
			}
		}
		return t.format();
	} else {
		throw new Error("template file is NOT exist.");
	}
}

module.exports.renderFile = function(template_name, data, output_file) {
	var content = exports.render(template_name, data);
	fs.writeFileSync(output_file, data, 'UTF-8');
}