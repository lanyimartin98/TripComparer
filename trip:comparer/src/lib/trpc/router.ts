import type { Context } from './context';
import { initTRPC } from '@trpc/server';
import { PUBLIC_LEAN_URL } from '$env/static/public';
import axios from 'axios';
import type { Airport } from '$lib/interface/Airport';
import type { Make } from '$lib/interface/Make';
import type { Model } from '$lib/interface/Model';
export const t = initTRPC.context<Context>().create();

export const router = t.router({
	airports: t.procedure.query(async () => {
		const resp = await axios.get(`${PUBLIC_LEAN_URL}/airports/`);
		const airPorts: Airport[] = resp.data.data.map((a: any) => {
			const airport: Airport = {
				name: a.nameAirport,
				IATA: a.codeIataAirport
			};
			return airport;
		});
		return airPorts;
	}),
	makes: t.procedure.query(async () => {
		const resp = await axios.get(`${PUBLIC_LEAN_URL}/vehicle_makes`);
		const makes: Make[] = resp.data.map((m: any) => {
			const make: Make = {
				id: m.data.id,
				name: m.data.attributes.name
			};
			return make;
		});
		return makes;
	}),
	models: t.procedure.query(async (id) => {
		const resp = await axios.get(`${PUBLIC_LEAN_URL}/vehicle_makes/model?id=${id}`);
		const responseModels: Model[] = resp.data.map((m: any) => {
			const model: Model = {
				id: m.data.id,
				name: m.data.attributes.name
			};
			return model;
		});
		return responseModels;
	})
});

export type Router = typeof router;
