import { Hop, APIAuthentication } from "https://esm.sh/@onehop/js@1.3.15";
import * as dotenv from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { HOP_API_KEY } = dotenv.config({
	path: import.meta.resolve("./.env"),
	safe: true,
});

if (import.meta.main) {
	const hop = new Hop(HOP_API_KEY as APIAuthentication);

	const deployments = await hop.ignite.deployments.getAll("project_MzMyMzcxMzA5MzUxMTU4MzQ");

	console.log(deployments);
}
