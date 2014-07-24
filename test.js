var fs = require('fs');
var walker = require('./lib/filewalker')
var path = require('path');

function test1() {
	walker.walkSync('./test', function(path, dirs, names) {
		names.forEach(function(element, index, array) {
			filename = path.join(path, element);
			console.log('file = ' + filename);
		});
	});
}

console.log("{Jayin}".replace('Jayin','Ton'));

var a = './md';
var b = './html'
console.log(a.replace(a,b));
