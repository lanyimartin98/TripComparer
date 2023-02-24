import { PUBLIC_LEAN_URL } from '$env/static/public';
import type { Airport } from '$lib/interface/Airport';
import axios from 'axios';
import { writable } from 'svelte/store';

export const airportStore = writable<Airport[]>([]);

export const getAllAirports = async () => {
	const resp = await axios.get(`${PUBLIC_LEAN_URL}/airports/`);
	airportStore.update(() => {
		const responseAirPorts: Airport[] = resp.data.data.map((a: any) => {
			const airport: Airport = {
				name: a.nameAirport,
				IATA: a.codeIataAirport
			};
			return airport;
		});
		return responseAirPorts;
	});
};
