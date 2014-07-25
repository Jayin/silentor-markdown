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



// var render  = require('./lib/render');
// render.render();

// var P = require('./lib/P');
// var t =P.from('Hello {name} ').put('name','Jayin').format();
// console.log(t);

// var a ={
// 	name:"jayin",
// 	no:"1",
// 	friends:[1,2,3,4],
// 	go:function(){
// 		console.log("go!");
// 	}
// }

// for (var attr in a){
// 	console.log(typeof a[attr]);

// 	console.log('key = '+attr+' value='+a[attr]);
// }

console.log("ab.md".split('.')[0]);