import { API_URL, API_KEY } from "$env/static/private";
import axios from 'axios';
import type {Vehicle} from "$lib/interface/Vehicle";
import type {Flight} from "$lib/interface/Flight";

const config={
    headers: { Authorization: `Bearer ${API_KEY}` }
}

export async function getMakes(){
    const makes=await axios.get(`${API_URL}/vehicle_makes`,config)
    return makes;
}

export async function getModels(make:string){
    const models=await axios.get(`${API_URL}/vehicle_makes/${make}`,config);
    return models;
}

export async function getEstimateVehicle(vehicle:Vehicle){
    const data={
      "type": "vehicle",
      "distance_unit": vehicle.distance_unit,
      "distance_value": vehicle.distance_value,
      "vehicle_model_id": vehicle.vehicle_model.vehicle_model_id
    }
    const estimate=await axios.post(`${API_URL}/estimates`,data,config);
    return estimate;
}

export async function getEstimateFlight(flight:Flight){
    const data={
        "type": "flight",
        "passengers": flight.passengers,
        "legs": flight.legs
      }
      const estimate=await axios.post(`${API_URL}/estimates`,data,config);
      return estimate;
}