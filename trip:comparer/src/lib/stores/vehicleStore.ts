import { PUBLIC_LEAN_URL } from '$env/static/public';
import type { Make } from '$lib/interface/Make';
import type { Model } from '$lib/interface/Model';
import { trpc } from '$lib/trpc/client';
import axios from 'axios';
import { writable } from 'svelte/store';

export const makeStore = writable<Make[]>([]);

export const getAllMakes = async () => {
	const makes: Make[] = await trpc().makes.query();
	makeStore.update(() => {
		return makes;
	});
};
export const getModelsById = async (id: String) => {
	const models: Model[] = await trpc().models.query(id);
	return models;
};
