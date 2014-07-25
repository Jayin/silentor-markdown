var render = require('../lib/render');



var result = render.render('../templates/content.html', {
	title: "Hi",
	content: "Content!!!"
});

console.log(result);