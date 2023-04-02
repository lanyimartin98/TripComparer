import type { Airport } from '$lib/interface/Airport';
import { trpc } from '$lib/trpc/client';
import axios from 'axios';
import { writable } from 'svelte/store';

export const airportStore = writable<Airport[]>([]);

export const getAllAirports = async () => {
	const airports: Airport[] = await trpc().airports.query();
	airportStore.update(() => {
		return airports;
	});
};
