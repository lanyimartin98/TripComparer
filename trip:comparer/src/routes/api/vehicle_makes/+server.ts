import axios from 'axios';
import { CARBON_INTERFACE_API_URL, CARBON_INTERFACE_API_KEY } from "$env/static/private";

export async function GET() {
	const config = {
		headers: {
			Authorization: `Bearer ${CARBON_INTERFACE_API_KEY}`,
			'Content-Type': 'application/json'
		}
	};

	const resp = await axios.get(`${CARBON_INTERFACE_API_URL}/vehicle_makes/`, config);
	return new Response(JSON.stringify(resp.data));
}
