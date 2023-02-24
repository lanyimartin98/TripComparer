export function GET() {
	const resp = {
		data: [
			{
				GTM: '1',
				airportId: 7,
				codeIataAirport: 'AAH',
				codeIataCity: 'AAH',
				codeIcaoAirport: 'EDKA',
				codeIso2Country: 'DE',
				geonameId: '3207669',
				latitudeAirport: 50.75,
				longitudeAirport: 6.133333,
				nameAirport: 'Aachen/Merzbruc',
				nameCountry: 'Germany',
				phone: '',
				timezone: 'Europe/Berlin'
			}
		]
	};
	return new Response(JSON.stringify(resp));
}
