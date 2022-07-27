import { Hop, APIAuthentication } from "@onehop/js";
import { nanoid } from "nanoid";
import { NextApiHandler } from "next";
import { HOP_CHANNEL_NAME } from "../../config";

const hop = new Hop(process.env.HOP_PROJECT_TOKEN as APIAuthentication);

const handler: NextApiHandler = async (req, res) => {
	const { content } = req.body;

	await hop.channels.publishMessage(HOP_CHANNEL_NAME, "MESSAGE_SEND", {
		content,
		id: nanoid(),
	});

	res.status(200).json({ success: true });
};

export default handler;
