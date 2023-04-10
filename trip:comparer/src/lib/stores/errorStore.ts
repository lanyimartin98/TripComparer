import { writable } from 'svelte/store';

export const errorStore = writable<string[]>([]);

export const pushError = (error: string) => {
	errorStore.update((errors: string[]) => {
		return [error, ...errors];
	});
};
