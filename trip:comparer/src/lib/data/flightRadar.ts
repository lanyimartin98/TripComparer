import { VERCEL_FLIGHT_RADAR_API_KEY, VERCEL_FLIGHT_RADAR_API_URL } from '$env/static/private';
import axios from 'axios';

export const getAirports = async () => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'X-RapidAPI-Key': VERCEL_FLIGHT_RADAR_API_KEY,
			'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
		}
	};
	const resp = await axios.get(`${VERCEL_FLIGHT_RADAR_API_URL}/airports/list`, config);
	return resp;
};
