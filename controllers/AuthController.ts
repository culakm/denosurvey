import { RouterContext, hashSync, compareSync } from "../deps.ts";
import User from "../models/User.ts";

class AuthController {
	login() {

	}
	async register(ctx: RouterContext) {
		// const obj = await ctx.request.body();
		// console.log(await obj.value);

		const { value } = ctx.request.body();
    	const {name, email, password } = await value;
		console.log(name + ' ' + email + ' ' + password);

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