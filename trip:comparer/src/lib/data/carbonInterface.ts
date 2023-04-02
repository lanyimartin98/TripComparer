import axios from 'axios';
import {
	CARBON_INTERFACE_API_URL,
	CARBON_INTERFACE_API_KEY,
	CARBON_INTERFACE_API_URL_MOCK,
	CARBON_INTERFACE_API_KEY_MOCK
} from '$env/static/private';

export async function getMakes() {
	const config = {
		headers: {
			Authorization: `Bearer ${CARBON_INTERFACE_API_KEY}`,
			'Content-Type': 'application/json'
		}
	};

	const resp = await axios.get(`${CARBON_INTERFACE_API_URL}/vehicle_makes/`, config);
	return resp;
}

export async function getModels(id: string) {
	const config = {
		headers: {
			Authorization: `Bearer ${CARBON_INTERFACE_API_KEY}`,
			'Content-Type': 'application/json'
		}
	};

	const resp = await axios.get(
		`${CARBON_INTERFACE_API_URL}/vehicle_makes/${id}/vehicle_models`,
		config
	);
	return resp;
}
