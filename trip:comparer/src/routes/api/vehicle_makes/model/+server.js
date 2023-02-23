import axios from 'axios';
import { API_URL, API_KEY } from '$env/static/private';
import { page } from '$app/stores';

export async function GET({ url }) {
	const id = url.searchParams.get('id');
	const config = {
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json'
		}
	};

	const resp = await axios.get(`${API_URL}/vehicle_makes/${id}/vehicle_models`, config);
	return new Response(JSON.stringify(resp.data));
}
