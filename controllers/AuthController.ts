import { RouterContext, hashSync, compareSync } from "../deps.ts";
import { djwt } from "../deps.ts";
import "https://deno.land/std@0.191.0/dotenv/load.ts";

import User from "../models/User.ts";

class AuthController {
	async login(ctx: RouterContext) {
		const { value } = ctx.request.body();
    	const {email, password } = await value;

		if (!email || !password) {
			ctx.response.status = 422;
			ctx.response.body = {messge: "email or password missing!"};
			return;
		}

		let user = await User.findOne({email});
		if (!user) {
			ctx.response.status = 422;
			ctx.response.body = {messge: "Incorrect email!"};
			return;
		}

		if(!compareSync(password,user.password)){
			ctx.response.status = 422;
			ctx.response.body = {messge: "Incorrect password!"};
			return;
		}

		const key = await crypto.subtle.generateKey(
			{ name: "HMAC", hash: "SHA-512" },
			true,
			["sign", "verify"],
		  );
		//console.log(Deno.env.get("JWT_SECRET_KEY"));

		const jwt = await djwt.create(
			{ alg: "HS512", typ: "JWT" },
			{ iss: user.email, exp: djwt.getNumericDate(new Date().getTime() + 60 * 60 * 1000) },
			key
		);

		ctx.response.body = {
			id: user.id,
			name: user.name,
			email: user.email,
			jwt
		};

	}
	async register(ctx: RouterContext) {
		// const obj = await ctx.request.body();
		// console.log(await obj.value);

		// takto obdrzime data z requestu
		const { value } = ctx.request.body();
    	const {name, email, password } = await value;

		let user = await User.findOne({email});
		if (user) {
			ctx.response.status = 422;
			ctx.response.body = {messge: "Email is already used"};
			return;
		}
		const hashedPassword = hashSync(password);
		user = new User({name, email, password: hashedPassword});
		await user.save();
		ctx.response.status = 201;
		ctx.response.body = {
			id: user.id,
			name: user.name,
			email: user.email
		}
	}
}

const authController = new AuthController();

export default authController;