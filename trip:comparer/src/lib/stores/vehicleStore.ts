import { PUBLIC_LEAN_URL } from '$env/static/public';
import type { Make } from '$lib/interface/Make';
import type { Model } from '$lib/interface/Model';
import axios from 'axios';
import { writable } from 'svelte/store';

export const makeStore = writable<Make[]>([]);

export const getAllMakes = async () => {
	const resp = await axios.get(`${PUBLIC_LEAN_URL}/vehicle_makes`);
	makeStore.update(() => {
		const responseMakes: Make[] = resp.data.map((m: any) => {
			const make: Make = {
				id: m.data.id,
				name: m.data.attributes.name
			};
			return make;
		});
		return responseMakes;
	});
};

export const getModelsById = async (id: String) => {
	const resp = await axios.get(`${PUBLIC_LEAN_URL}/vehicle_makes/model?id=${id}`);
	const responseModels: Model[] = resp.data.map((m: any) => {
		const model: Model = {
			id: m.data.id,
			name: m.data.attributes.name
		};
		return model;
	});
	return responseModels;
};
