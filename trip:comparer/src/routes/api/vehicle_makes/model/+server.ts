import axios from 'axios';
import { CARBON_INTERFACE_API_URL, CARBON_INTERFACE_API_KEY } from '$env/static/private';
import { page } from '$app/stores';

export async function GET({ url }) {
	const id = url.searchParams.get('id');
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
	return new Response(JSON.stringify(resp.data));
}
