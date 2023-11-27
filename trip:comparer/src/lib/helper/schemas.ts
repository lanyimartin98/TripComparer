import { z } from 'zod';

export const flightSchema = z.object({
	type: z.string().includes('flight'),
	passengers: z.number(),
	legs: z.array(
		z.object({
			departure_airport: z.string().max(3).min(3),
			destination_airport: z.string().max(3).min(3)
		})
	)
});

export const vehicleSchema = z.object({
	type: z.string().includes('vehicle'),
	distance_unit: z.string(),
	distance_value: z.number().gt(1),
	vehicle_make: z.string().min(3),
	vehicle_model_id: z.string().min(3)
});
