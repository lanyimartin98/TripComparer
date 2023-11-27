# TODO

- [x] Types and interfaces
- [x] User Interface implementation
- [x] Mock data
- [x] API implementation (Sending and receiving data)
- [x] Business Logic of Comparing
- [ ] Error handling
- [ ] Searchable select for aiports and cars

# Interfaces

## Trip

- transport_obj: TransportObj[]
- carbon_g: number

## TransportObj

- type: Flight|Vehicle

## Flight

- type: "flight"
- passengers: number
- legs: Leg[]

## vehicle

- type: "vehicle"
- distance_unit: "km"|"mi"
- distance_value: number
- vehicle_model: vehicleModel

## Leg

- departure_airport: String
- destination_airport: String

## vehicleModel

-vehicle_make_id: String
-vehicle_model_id: String
