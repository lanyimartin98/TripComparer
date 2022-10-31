export function POST(){
    const resp={
        "data": {
            "id": "6108d711-be04-4dc4-93f9-43d969fd5273",
            "type": "estimate",
            "attributes": {
              "distance_value": 100.0,
              "vehicle_make": "Toyota",
              "vehicle_model": "Corolla",
              "vehicle_year": 1993,
              "vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9",
              "distance_unit": "mi",
              "estimated_at": "2021-01-10T15:24:32.568Z",
              "carbon_g": 37029,
              "carbon_lb": 81.64,
              "carbon_kg": 37.03,
              "carbon_mt": 0.04
            }
          }
    }
    return new Response(JSON.stringify(resp));
}