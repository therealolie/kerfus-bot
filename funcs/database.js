const fs = require('fs');

class v1database {
	dirname;
	constructor(name) {
		this.dirname = name;
	}

	//v1 - deprecated, dont use
	getuser(type, id, def = false) {
		let dir = `${this.dirname}/${type}`;
		let path = `${dir}/${id}`;
		if (fs.existsSync(path))
			return '' + fs.readFileSync(path);
		if (!def) 
			return JSON.stringify(def);
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		fs.closeSync(fs.openSync(path, 'w'));
		fs.writeFileSync(path, JSON.stringify(def));

		return JSON.stringify(def);
	}
	setuser(type, id, setto) {
		let dir = `${this.dirname}/${type}`;
		let path = `${dir}/${id}`;
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		fs.closeSync(fs.openSync(path, 'w'));
		fs.writeFileSync(path, JSON.stringify(setto));
		return;
	}
	deluser(type, id) {
		let dir = `${this.dirname}/${type}`;
		let path = `${dir}/${id}`;
		fs.unlink(path, (err) => { });
	}

	get(id, def) {
		let dir = `${this.dirname}/other`;
		let path = `${dir}/${id}`;
		if (fs.existsSync(path))
			return '' + fs.readFileSync(path);
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		fs.closeSync(fs.openSync(path, 'w'));
		fs.writeFileSync(path, JSON.stringify(def));
		return JSON.stringify(def);
	}
	set(id, setto) {
		let dir = `${this.dirname}/other`;
		let path = `${dir}/${id}`;
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		fs.closeSync(fs.openSync(path, 'w'));
		if ((typeof setto).startsWith('['))
			fs.writeFileSync(path, JSON.stringify(setto));
		else fs.writeFileSync(path, `${setto}`);
		return;
	}

	gettype(type, id, def = false) {
		let dir = `${this.dirname}/${type}`;
		let path = `${dir}/${id}`;
		if (fs.existsSync(path))
			return '' + fs.readFileSync(path);
		if (!def)
			return def;
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		fs.closeSync(fs.openSync(path, 'w'));
		fs.writeFileSync(path, JSON.stringify(def));
		return def;
	}
	settype(type, id, setto) {
		let dir = `${this.dirname}/${type}`;
		let path = `${dir}/${id}`;
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		fs.closeSync(fs.openSync(path, 'w'));
		fs.writeFileSync(path, JSON.stringify(setto));
		return;
	}
	deltype(type, id) {
		let dir = `${this.dirname}/${type}`;
		let path = `${dir}/${id}`;
		fs.unlink(path, (err) => { });
	}

	//v2
	v2get(id, def = false) {
		let path = `${this.dirname}${id}`;
		let dir = path.split('/').slice(0, -1).join('/');
		if (fs.existsSync(path))
			return '' + fs.readFileSync(path);
		if (!def)
			return def;
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		fs.closeSync(fs.openSync(path, 'w'));
		fs.writeFileSync(path, def);
		return def;
	}
	v2set(id, setto) {
		let path = `${this.dirname}${id}`;
		let dir = path.split('/').slice(0, -1).join('/');
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		fs.closeSync(fs.openSync(path, 'w'));
		fs.writeFileSync(path, `${setto}`);
		return this;
	}
	v2del(id) {
		let path = `${this.dirname}${id}`;
		if (fs.existsSync(path))
			fs.unlink(path, (err) => { });
		return this;
	}

	v2_loaduser(type, id) {
		let dir = `${this.dirname}users/`;
		let path = `${dir}${id}.json`;
		if (!fs.existsSync(dir))
			fs.mkdirSync(dir, { recursive: true });
		if (type in require(path))
			return require(path);
		//moving data from v1 to v2
		let from_v1 = this.getuser(type, id);
		if (from_v1 == "false")
			from_v1 = this.getuser(type, id + '.json');
		if (from_v1 == "false") {
			let data = (fs.existsSync(path) ? require(path) : {});
			return data;
		}
		this.deluser(type, id);
		let data = (fs.existsSync(path) ? require(path) : {});
		data[type] = from_v1;
		fs.writeFileSync(path, JSON.stringify(data));
		return data;
		// </moving data>
		return require(path);
	}

	v2getuser(type, id, def = false) {
		let data = this.v2_loaduser(type, id);
		if (type in data)
			return data[type];
		if (!def)
			return null;
		data[type] = def;
		let path = `${this.dirname}users/${id}.json`;
		fs.writeFileSync(path, JSON.stringify(data));
		return def;
	}
	v2setuser(type, id, setto) {
		let data = this.v2_loaduser(type, id);
		data[type] = setto;
		let path = `${this.dirname}users/${id}.json`;
		fs.writeFileSync(path, JSON.stringify(data));
		return this;
	}
	v2deluser(type, id) {
		let data = this.v2_loaduser(type, id);
		if (!(type in data))
			return this;
		delete data[type];
		let path = `${this.dirname}users/${id}.json`;
		fs.writeFileSync(path, JSON.stringify(data));
		return this;
	}
}

module.exports = v1database;
