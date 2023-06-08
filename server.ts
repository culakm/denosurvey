// import {} as oak from "https://deno.land/x/oak@v12.5.0/mod.ts";
// import {
// 	Application,
// 	Router,
// 	RouterContext,
//   } from "https://deno.land/x/oak@v12.5.0/mod.ts";

import { Application } from "./deps.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener('listen', ({hostname, port, secure}) => {
	//console.log(`listening on ${secure ? 'https://' : 'http://' }${hostname || 'localhost'}:${port}`);
	console.log(`listening on ${secure ? 'https://' : 'http://' }localhost:${port}`);
});
await app.listen({port: 8000});
