export function GET() {
	const resp = [
		{
			data: {
				id: '4c1e16e1-7967-4394-b3cb-15f4577dffa1',
				type: 'vehicle_make',
				attributes: {
					name: 'Ferrari',
					number_of_models: 243
				}
			}
		},
		{
			data: {
				id: 'c0d79b67-76e8-442d-b105-2c73501948a9',
				type: 'vehicle_make',
				attributes: {
					name: 'Dodge',
					number_of_models: 2608
				}
			}
		},
		{
			data: {
				id: 'c983d62d-e823-4bfb-92a8-45d161be1fe1',
				type: 'vehicle_make',
				attributes: {
					name: 'Subaru',
					number_of_models: 924
				}
			}
		},
		{
			data: {
				id: '2b1d0cd5-59be-4010-83b3-b60c5e5342da',
				type: 'vehicle_make',
				attributes: {
					name: 'Toyota',
					number_of_models: 2162
				}
			}
		}
	];
	return new Response(JSON.stringify(resp));
}
