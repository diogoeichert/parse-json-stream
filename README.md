[![code style](https://img.shields.io/badge/code_style-classic-blue.svg)](http://diogoeichert.github.io/eslint-config-classic)
[![downloads](https://img.shields.io/npm/dt/parse-json-stream.svg)](https://www.npmjs.com/package/parse-json-stream)
[![license](https://img.shields.io/github/license/diogoeichert/parse-json-stream.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/parse-json-stream.svg)](https://www.npmjs.com/package/parse-json-stream)

# parse-json-stream
Stream-JSON parser.

Parser for large streams of json data, allows processing objects asynchronously

## Usage
```
const Parser = require("parse-json-stream");

let parser = new Parser(function (error, object) {
	if (error) {
		console.log(error.message);
	} else if (object) {
		console.log(object);
	} else {
		console.log('done');
	}
});
```

Then call it on every new chunk of data, i.e. the async request, e.g.
```
const https = require("https");

https.get(url, res => {
	res.on("data", data => {
		parser.parse(data);
	});
});
```
