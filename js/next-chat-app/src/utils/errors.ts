function hasMessage<T extends object>(value: T): value is T & { message?: unknown } {
	return Reflect.has(value, "message");
}

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	if (
		error !== null &&
		typeof error === "object" &&
		hasMessage(error) &&
		typeof error.message === "string"
	) {
		return error.message;
	}

	return "Something went wrong";
}
