import type { VehicleModel } from './VehicleModel';

export interface Vehicle {
	type: 'Vehicle';
	distance_unit: 'km' | 'mi';
	distance_value: number | undefined;
	vehicle_model_id: string;
	vehicle_make: string;
}
