import { RouterContext } from "../deps.ts";

class SurveyController{
	getAllForUser(ctx: RouterContext){
		ctx.response.body = [];
	}
	getSingle(ctx: RouterContext){

	}
	create(ctx: RouterContext){

	}
	update(ctx: RouterContext){

	}
	delete(ctx: RouterContext){

	}
}

const surveyController = new SurveyController();
export default surveyController;