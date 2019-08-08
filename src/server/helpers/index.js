/**********
 * HELPERS
 **********/
const path       = require('path');
const fs         = require('fs');
const fse        = require('fs-extra');
const fsPromises = fs.promises;

/* Helpers
 **********/
const Helpers = {
	copy(src, dest) { // :Promise<void>
		return fse.copy(src, dest);
	},
	async getFileContents(_path) { // :fileContents<string>
		const file = await fsPromises.readFile(_path); // :Buffer
		return file.toString();
	},
	getFileName(_path, withExt = true) { // :string (file name)
		if (withExt) return path.basename(_path);
		return path.basename(_path, path.extname(_path));
	},
	isFileType(filePath, ext) { // :boolean
		const extname = path.extname(filePath).replace('.','').toLowerCase();
		return extname === ext;
	},
	mkdir(_path) { // :Promise<void>
		return fsPromises.mkdir(_path, { recursive: true });
	},
	async readdir(_path, filter = true) { // :string[] (file names with extensions)
		let files = await fsPromises.readdir(_path);
		if (filter) files = files.filter(file => file[0] !== '.'); // filter out dot files (ex: .DS_Store)
		return files;
	},
	remove(_path) { // :Promise<void>
		return fse.remove(_path);
	},
	writeFile(_path, data) { // :Promise<void>
		return fsPromises.writeFile(_path, data);
	}
}

/* Export it!
 *************/
module.exports = Helpers;