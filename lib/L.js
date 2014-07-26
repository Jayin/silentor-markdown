var _enableLog = true;

module.exports.enableLog = function (enable){
	_enableLog = enable;
}

module.exports.log = function (msg){
	console.log(msg);
}