import type { Leg } from './Leg';

export interface Flight {
	type: 'Flight';
	passengers: number;
	legs: Leg[];
}
