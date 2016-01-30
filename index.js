var fs = require('fs');
var path = require('path');
var Compiler = require('angular-gettext-tools').Compiler;

var c = new Compiler({
  format: 'json'
});
var content = fs.readFileSync(path.resolve(__dirname, './po/zh_CN.po'), 'utf-8');
var contents = c.convertPo([content]);

fs.writeFile('abc.json',contents);
//console.log(contents);