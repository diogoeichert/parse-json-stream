"use strict";

const INDEX_TO_LENGTH = 1;
const NEXT_BRACE = 1;
const OUTMOST_ARRAY = 1;

module.exports = class {
	constructor(callback) {
		this.braces = 0;
		this.brackets = 0;
		this.callback = callback;
		this.cursor = 0;
		this.data = "";
		this.level = 0;
	}

	parse(buffer) {
		const data = buffer.toString();
		const length = this.data.length;
		this.data += data;

		for (let i = 0; i < data.length; ++i) {
			const cursor = length + i;
			const token = data[i];

			if (token == "[" && ++this.brackets == OUTMOST_ARRAY) {
				this.level = this.braces + NEXT_BRACE;
			} else if (token == "{" && ++this.braces == this.level) {
				this.cursor = cursor;
			} else if (token == "}" && this.braces-- == this.level) {
				try {
					const substring = this.data.substring(this.cursor, cursor + INDEX_TO_LENGTH);
					this.callback(null, JSON.parse(substring));
				} catch (error) {
					this.callback(error.message);
				}
			} else if (token == "]" && this.brackets-- == OUTMOST_ARRAY) {
				this.callback();
			}
		}
	}
};
