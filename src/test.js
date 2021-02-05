"use strict";

const assert = require("assert");
const Parser = require("./index");

const data = JSON.stringify({
	name: "sample",
	list: [
		{
			title: "basic",
			description: "basic object"
		},
		{
			title: "nesting",
			description: "nesting object",
			properties: {
				name: "nested",
				description: "nested object"
			}
		},
		{
			title: "complex",
			description: "complex object",
			list: [
				{
					title: "sample 1",
				},
				{
					title: "sample 2",
				},
				{
					title: "sample 3",
				}
			]
		}
	]
});

const tests = {
	"basic" () {
		let done = false;
		const errors = [];
		const objects = [];
		
		let parser = new Parser((error, object) => {
			if (error) {
				errors.push(error.message);
			} else if (object) {
				objects.push(object);
			} else {
				done = true;
			}
		});
		
		parser.parse(data);
		assert.equal(errors.length, 0);
		assert.equal(objects.length, 3);
		assert.equal(done, true);
	},
	"randomStress" () {
		for (let i = 0; i < 100; ++i) {
			const chunks = [];
			let done = false;
			const errors = [];
			const objects = [];
			
			let parser = new Parser((error, object) => {
				if (error) {
					errors.push(error.message);
				} else if (object) {
					objects.push(object);
				} else {
					done = true;
				}
			});
			
			let cursor = 0;
			
			while (cursor < data.length) {
				let size = Math.ceil((data.length - cursor) * Math.random());

				if (size < 1) {
					++size;
				}

				if (size == data.length) {
					--size;
				}

				const chunk = data.substr(cursor, size);
				chunks.push(chunk);
				parser.parse(chunk);
				cursor += size;
			}
			
			assert.equal(errors.length, 0);
			assert.equal(objects.length, 3);
			assert.equal(done, true);
		}
	}
};

for (const name in tests) {
	try {
		tests[name]();
	} catch (e) {
		console.log(e);
	}
}
