var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
var content = { '2.10.1': '2.10', '2.11.1': '2.11', '2.12.0': '2.12', '2.13.2': '2.13' };
if (!content[version]) content[version] = '2.14';
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
