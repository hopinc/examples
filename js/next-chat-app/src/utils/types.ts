export interface Message {
	content: string;
	author: string;
	id: string;
}

export type PickWhereValuesAre<T, V> = {
	[Key in keyof T as T[Key] extends V ? Key : never]: T[Key];
};
