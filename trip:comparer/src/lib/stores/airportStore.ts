import type { Airport } from '$lib/interface/Airport';
import { trpc } from '$lib/trpc/client';
import { TRPCClientError } from '@trpc/client';
import axios from 'axios';
import { writable } from 'svelte/store';
import { pushError } from './errorStore';

export const airportStore = writable<Airport[]>([]);

export const getAllAirports = async () => {
	try {
		const airports: Airport[] = await trpc().airports.query();
		airportStore.update(() => {
			return airports;
		});
	} catch (err) {
		if (err instanceof TRPCClientError) {
			pushError(err.message);
		} else {
			pushError('Internal server error.');
		}
	}
};
