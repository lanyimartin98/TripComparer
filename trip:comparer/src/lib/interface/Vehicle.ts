import type { VehicleModel } from './VehicleModel';

export interface Vehicle {
	type: 'vehicle';
	distance_unit: 'km' | 'mi';
	distance_value: number | undefined;
	vehicle_model: VehicleModel;
}
