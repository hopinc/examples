import { useEffect, useRef, useState } from "react";
import { useChannelMessage } from "@onehop/react";
import { HOP_CHANNEL_NAME } from "../config";
import { Message } from "../types";

export default function Index() {
	const [messages, setMessages] = useState<Array<{ content: string; id: string }>>([]);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useChannelMessage<Message>(HOP_CHANNEL_NAME, "MESSAGE_CREATE", message => {
		setMessages(messages => [...messages, message]);
	});

	useEffect(() => {
		if (!loading) {
			inputRef.current?.focus();
		}
	}, [loading]);

	return (
		<div>
			<h1>Previous Chat App</h1>

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
				<input
					ref={inputRef}
					disabled={loading}
					type="text"
					value={message}
					onChange={e => setMessage(e.target.value)}
				/>

				<button disabled={loading} type="submit">
					Send
				</button>
			</form>

			<ul>
				{messages.map(message => (
					<li key={message.id}>{message.content}</li>
				))}
			</ul>
		</div>
	);
}
