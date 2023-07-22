import type { Flight } from './Flight';
import type { Vehicle } from './Vehicle';

export interface TransportObj {
	type: Flight | Vehicle | null;
	formValid:boolean;
}
