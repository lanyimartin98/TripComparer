import type { Leg } from './Leg';

export interface Flight {
	type: 'flight';
	passengers: number;
	legs: Leg[];
}
