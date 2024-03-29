export function POST(){
    const resp={
        "data": {
            "id": "d60edacc-cf6c-4da7-b5de-c538de4ce5ee",
            "type": "estimate",
            "attributes": {
              "passengers": 2,
              "legs": [
                {
                  "departure_airport": "SFO",
                  "destination_airport": "YYZ"
                },
                {
                  "departure_airport": "YYZ",
                  "destination_airport": "SFO"
                }
              ],
              "estimated_at": "2020-07-24T02:25:50.837Z",
              "carbon_g": 1077098,
              "carbon_lb": 2374,
              "carbon_kg": 1077,
              "carbon_mt": 1,
              "distance_unit": "km",
              "distance_value": 7454.15
            }
        }
    }
    return new Response(JSON.stringify(resp));
}