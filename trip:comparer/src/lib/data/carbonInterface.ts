import axios from 'axios';
import {
	CARBON_INTERFACE_API_URL,
	CARBON_INTERFACE_API_KEY,
	CARBON_INTERFACE_API_URL_MOCK,
	CARBON_INTERFACE_API_KEY_MOCK
} from '$env/static/private';
import type { TransportObj } from '$lib/interface/TransportObj';

const config = {
	headers: {
		Authorization: `Bearer ${CARBON_INTERFACE_API_KEY_MOCK}`,
		'Content-Type': 'application/json'
	}
};

export const getMakes = async () => {
	const resp = await axios.get(`${CARBON_INTERFACE_API_URL_MOCK}/vehicle_makes/`, config);
	return resp;
};

export const getModels = async (id: string) => {
	const resp = await axios.get(
		`${CARBON_INTERFACE_API_URL_MOCK}/vehicle_makes/${id}/vehicle_models`,
		config
	);
	return resp;
};

export const getEstimate = async (transportobj: object) => {
	const resp = await axios.post(`${CARBON_INTERFACE_API_URL_MOCK}/estimates`, transportobj, config);
	return resp;
};
