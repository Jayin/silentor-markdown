var marked = require('./lib/marked');
var fs = require('fs');


var content = fs.readFileSync('a.md', 'utf-8');
// console.log(content);
console.log(marked(content));

fs.writeFileSync('tmp.html', marked(content), 'utf-8');

