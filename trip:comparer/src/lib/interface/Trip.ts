import type { TransportObj } from './TransportObj';

export interface Trip {
	transport_obj: TransportObj[];
	carbon_g: number | null;
}
