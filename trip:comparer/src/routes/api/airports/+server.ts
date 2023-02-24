import axios from 'axios';
import { FLIGHT_LABS_API_URL, FLIGHT_LABS_API_KEY } from '$env/static/private';

export async function GET() {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const resp = await axios.get(
		`${FLIGHT_LABS_API_URL}/airports?access_key=${FLIGHT_LABS_API_KEY}`,
		config
	);
	return new Response(JSON.stringify(resp.data));
}
