import {
	FLIGHT_RADAR_API_KEY,
	FLIGHT_RADAR_API_KEY_MOCK,
	FLIGHT_RADAR_API_URL,
	FLIGHT_RADAR_API_URL_MOCK
} from '$env/static/private';
import axios from 'axios';

export const getAirports = async () => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'X-RapidAPI-Key': FLIGHT_RADAR_API_KEY_MOCK,
			'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
		}
	};
	const resp = await axios.get(`${FLIGHT_RADAR_API_URL_MOCK}/airports/list`, config);
	return resp;
};
