import type { Context } from './context';
import { initTRPC } from '@trpc/server';
import type { Airport } from '$lib/interface/Airport';
import type { Make } from '$lib/interface/Make';
import type { Model } from '$lib/interface/Model';
import { getAirports } from '$lib/data/flightRadar';
import { getMakes, getModels } from '$lib/data/carbonInterface';
import { z } from 'zod';
export const t = initTRPC.context<Context>().create();

export const router = t.router({
	airports: t.procedure.query(async () => {
		const resp = await getAirports();
		const airPorts: Airport[] = resp.data.rows.map((a: any) => {
			const airport: Airport = {
				name: a.name,
				IATA: a.iata
			};
			return airport;
		});
		return airPorts;
	}),
	makes: t.procedure.query(async () => {
		const resp = await getMakes();
		const makes: Make[] = resp.data.map((m: any) => {
			const make: Make = {
				id: m.data.id,
				name: m.data.attributes.name
			};
			return make;
		});
		return makes;
	}),
	models: t.procedure.input(z.string()).query(async ({ input }) => {
		const resp = await getModels(input);
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
