import { Hop, APIAuthentication } from "@onehop/js";
import { nanoid } from "nanoid";
import { NextApiHandler } from "next";
import { HOP_CHANNEL_NAME } from "../../utils/config";
import { Message } from "../../utils/types";

const hop = new Hop(process.env.HOP_PROJECT_TOKEN as APIAuthentication);

const handler: NextApiHandler = async (req, res) => {
	const { content, author } = req.body;

	if (!content || !author) {
		return res.status(400).json({
			success: false,
			message: "Missing `.content` or `.author` field",
		});
	}

	const message: Message = {
		id: nanoid(),
		content: content.trim(),
		author: author === process.env.HOP_PROJECT_TOKEN ? "alistair" : author.trim(),
		isAdmin: author === process.env.HOP_PROJECT_TOKEN,
	};

	await hop.channels.publishMessage(HOP_CHANNEL_NAME, "MESSAGE_CREATE", message);

	await hop.channels.setState<{ messages: Message[] }>(HOP_CHANNEL_NAME, state => ({
		messages: [message, ...state.messages].slice(0, 20),
	}));

	res.status(200).json({
		success: true,
	});
};

export default handler;
