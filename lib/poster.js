var path = require('path');
module.exports.build = function(filepath) {
    var filename = filepath.split(path.sep)[filepath.split(path.sep).length - 1];
    var s = filename.split('-');
    if (s.length < 4) {
        throw new Error('the name of the file should be `yy-mm-dd-title-tag1-tag2.xxx`');
    }

    var year = parseInt(s[0]);
    var month = parseInt(s[1]);
    var day = parseInt(s[2]);
    var title = s[3];
    var tags = [];
    if (s.length > 4) {
        for (var i = 4; i < s.length - 1; i++) {
            tags.push(s[i]);
        }
        tags.push(s[s.length - 1].split('.')[0]);
    }else{
    	title = title.split('.')[0];
    }
    return {
        'year': year,
        'month': month,
        'day': day,
        'post_title': title,
        'tags': tags,
        'post_time': s[0] + '-' + s[1] + '-' + s[2],
        'filename': filename,
        'filepath': filepath
    }
}