import type { Make } from '$lib/interface/Make';
import type { Model } from '$lib/interface/Model';
import { trpc } from '$lib/trpc/client';
import { TRPCClientError } from '@trpc/client';
import axios from 'axios';
import { writable } from 'svelte/store';
import { pushError } from './errorStore';

export const makeStore = writable<Make[]>([]);

export const getAllMakes = async () => {
	try {
		const makes: Make[] = await trpc().makes.query();
		makeStore.update(() => {
			return makes;
		});
	} catch (err) {
		if (err instanceof TRPCClientError) {
			pushError(err.message);
		} else {
			pushError('Internal server error.');
		}
	}
};
export const getModelsById = async (id: String) => {
	try {
		const models: Model[] = await trpc().models.query(id);
		return models;
	} catch (err) {
		if (err instanceof TRPCClientError) {
			pushError(err.message);
		} else {
			pushError('Internal server error.');
		}
	}
};
