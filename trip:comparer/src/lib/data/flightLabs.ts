import axios from 'axios';
import {
	FLIGHT_LABS_API_URL,
	FLIGHT_LABS_API_KEY,
	FLIGHT_LABS_API_KEY_MOCK,
	FLIGHT_LABS_API_URL_MOCK
} from '$env/static/private';
export const getAiports = async () => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const resp = await axios.get(
		`${FLIGHT_LABS_API_URL_MOCK}/airports?access_key=${FLIGHT_LABS_API_KEY_MOCK}`,
		config
	);
	return resp;
};
