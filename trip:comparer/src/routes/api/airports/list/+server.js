export function GET() {
	const resp = {
		rows: [
			{
				GTM: '1',
				airportId: 7,
				iata: 'AAH',
				codeIataCity: 'AAH',
				codeIcaoAirport: 'EDKA',
				codeIso2Country: 'DE',
				geonameId: '3207669',
				latitudeAirport: 50.75,
				longitudeAirport: 6.133333,
				name: 'Aachen/Merzbruc',
				nameCountry: 'Germany',
				phone: '',
				timezone: 'Europe/Berlin'
			},
			{
				GTM: '1',
				airportId: 8,
				iata: 'BUD',
				codeIataCity: 'BUD',
				codeIcaoAirport: 'EDKA',
				codeIso2Country: 'DE',
				geonameId: '3207669',
				latitudeAirport: 50.75,
				longitudeAirport: 6.133333,
				name: 'Budapest',
				nameCountry: 'Germany',
				phone: '',
				timezone: 'Europe/Berlin'
			},
		]
	};
	return new Response(JSON.stringify(resp));
}
