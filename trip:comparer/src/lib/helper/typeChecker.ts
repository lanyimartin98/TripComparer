import type { Flight } from '$lib/interface/Flight';
import type { Vehicle } from '$lib/interface/Vehicle';

export function isFlight(flight: any): flight is Flight {
	if (flight !== null) {
		return (flight as Flight).type === 'flight';
	}
}

export function isVehicle(vehicle: any): vehicle is Vehicle {
	if (vehicle !== null) {
		return (vehicle as Vehicle).type === 'vehicle';
	}
}
