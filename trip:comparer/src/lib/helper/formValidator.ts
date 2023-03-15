import type { Flight } from '$lib/interface/Flight';
import type { TransportObj } from '$lib/interface/TransportObj';
import { z } from 'zod';
import { isFlight, isVehicle } from './typeChecker';

const flightForm = z.object({
	type: z.string().includes('flight'),
	passengers: z.number(),
	legs: z.array(
		z.object({
			departure_airport: z.string().max(3).min(3),
			destination_airport: z.string().max(3).min(3)
		})
	)
});

const vehicleForm = z.object({
	type: z.string().includes('vehicle'),
	distance_unit: z.string(),
	distance_value: z.number().gt(1),
	vehicle_model: z.object({
		vehicle_make_id: z.string(),
		vehicle_model_id: z.string()
	})
});

export const formValidate = (transportObject: TransportObj) => {
	if (isFlight(transportObject.type)) {
		return flightForm.safeParse(transportObject.type);
	} else if (isVehicle(transportObject.type)) {
		return vehicleForm.safeParse(transportObject.type);
	}
};
