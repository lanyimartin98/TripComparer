import axios from 'axios';
import {
	VERCEL_CARBON_INTERFACE_API_URL,
	VERCEL_CARBON_INTERFACE_API_KEY
} from '$env/static/private';
import type { TransportObj } from '$lib/interface/TransportObj';

const config = {
	headers: {
		Authorization: `Bearer ${VERCEL_CARBON_INTERFACE_API_KEY}`,
		'Content-Type': 'application/json'
	}
};

export const getMakes = async () => {
	const resp = await axios.get(`${VERCEL_CARBON_INTERFACE_API_URL}/vehicle_makes/`, config);
	return resp;
};

export const getModels = async (id: string) => {
	const resp = await axios.get(
		`${VERCEL_CARBON_INTERFACE_API_URL}/vehicle_makes/${id}/vehicle_models`,
		config
	);
	return resp;
};

export const getEstimate = async (transportobj: object) => {
	const resp = await axios.post(
		`${VERCEL_CARBON_INTERFACE_API_URL}/estimates`,
		transportobj,
		config
	);
	return resp;
};
