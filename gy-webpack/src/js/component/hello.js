class Hello {
	constructor(name){
		this.name = name;
	}
	say() {
		console.log('Hello ,' + this.name);
	}
}

module.exports = Hello