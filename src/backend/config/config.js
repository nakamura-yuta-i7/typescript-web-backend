var path = require("path")
var yaml = require('js-yaml');
var fs   = require('fs');

var APP_DIR = path.resolve("")
var SRC_DIR = APP_DIR + "/src"
var SRC_DIR_BACKEND = SRC_DIR + "/backend"

var config = {
  PASSWORD: yaml.safeLoad(fs.readFileSync(`${SRC_DIR_BACKEND}/config/passwords.yaml`, 'utf8')),
	APP: {
		ROOT: {
			DIR: {
				PATH: APP_DIR,
			},
		},
		SRC: {
			DIR: {
				PATH: SRC_DIR
			}
		}
	},
	DB: {
		DEFAULT: {
			PATH: SRC_DIR_BACKEND + "/db/default/default.sqlite"
		},
	}
}

module.exports = config
