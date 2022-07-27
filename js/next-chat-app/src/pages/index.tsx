import { useState } from "react";
import { useChannelMessage } from "@onehop/react";
import { HOP_CHANNEL_NAME } from "../config";
import { Message } from "../types";

export default function Index() {
	const [messages, setMessages] = useState<Array<{ content: string; id: string }>>([]);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	useChannelMessage<Message>(HOP_CHANNEL_NAME, "MESSAGE_SEND", message => {
		setMessages(messages => [...messages, message]);
	});

	return (
		<div>
			<h1>Next Chat App</h1>

			<ul>
				{messages.map(message => (
					<li key={message.id}>{message.content}</li>
				))}
			</ul>

			<form
				onSubmit={async e => {
					e.preventDefault();

					setLoading(true);

					try {
						await fetch("/api/message", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ content: message }),
						});
					} finally {
						setLoading(false);
					}
				}}>
				<input type="text" value={message} onChange={e => setMessage(e.target.value)} />
				<button type="submit">Send</button>
			</form>
		</div>
	);
}
