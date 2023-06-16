import { usersCollection } from "../mongo.ts";

export default class User {
	public id?: string;
	public name: string;
	public email: string;
	public password: string;

	constructor({id = '', name = '', email = '', password = ''}) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	static async findOne(params: object) {
		const user = await usersCollection.findOne(params);
		user.id = user._id;
		delete user._id;
		console.log(user);
		return new User(user);
	}

	async save() {
		delete this.id; // id sa vymaze pretoze v tomto momente ho nechceme
		const {insertedId} = await usersCollection.insertOne(this);
		this.id = insertedId; // id objektu sa nastavi podla insertedId z mongo
		return this;
	}
}