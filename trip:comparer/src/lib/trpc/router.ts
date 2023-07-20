import type { Context } from './context';
import { initTRPC, TRPCError } from '@trpc/server';
import type { Airport } from '$lib/interface/Airport';
import type { Make } from '$lib/interface/Make';
import type { Model } from '$lib/interface/Model';
import { getAirports } from '$lib/data/flightRadar';
import { getEstimate, getMakes, getModels } from '$lib/data/carbonInterface';
import { flightSchema,vehicleSchema } from '$lib/helper/schemas';
import { z } from 'zod';
import type { Result } from '$lib/interface/Result';


export const t = initTRPC.context<Context>().create();

export const router = t.router({
	airports: t.procedure.query(async () => {
		const resp = await getAirports();
		const airPorts: Airport[] = resp.data.rows.map((a: any) => {
			const airport: Airport = {
				name: a.name+' ('+a.iata+')',
				value: a.iata
			};
			return airport;
		});
		return airPorts;
	}),
	makes: t.procedure.query(async () => {
		const resp = await getMakes();
		const makes: Make[] = resp.data.map((m: any) => {
			const make: Make = {
				value: m.data.id,
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
				value: m.data.id,
				name: m.data.attributes.name +' ('+m.data.attributes.year+')',
				year: m.data.attributes.year
			};
			return model;
		});
		return responseModels;
	}),
	estimatesFlight: t.procedure
		.input(flightSchema)
		.query(async ({ input }) => {
			const resp = await getEstimate(input);
			const result: Result = {
				gram: resp.data.data.attributes.carbon_g,
				kilogram: resp.data.data.attributes.carbon_kg,
				pound: resp.data.data.attributes.carbon_lb,
				metric_ton: resp.data.data.attributes.carbon_mt
			};
			return result;
		}),

	estimatesVehicle: t.procedure
		.input(vehicleSchema)
		.query(async ({ input }) => {
			const resp = await getEstimate(input);
			const result: Result = {
				gram: resp.data.data.attributes.carbon_g,
				kilogram: resp.data.data.attributes.carbon_kg,
				pound: resp.data.data.attributes.carbon_lb,
				metric_ton: resp.data.data.attributes.carbon_mt
			};
			return result;
		})
});

export type Router = typeof router;
