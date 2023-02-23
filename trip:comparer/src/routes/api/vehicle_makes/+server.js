import axios from 'axios';
import { API_URL, API_KEY } from '$env/static/private';

export async function GET() {
	const config = {
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json'
		}
	};

	const resp = await axios.get(`${API_URL}/vehicle_makes/`, config);
	return new Response(JSON.stringify(resp.data));
}
