import Axios from "axios";


const OPENWETHER_API = Axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  params: {
    appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
    units: "metric"
  }
});
const GEO_API = Axios.create({
  baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo",
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_Geo_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
});
const LOCATIONIQ_API = Axios.create({
  baseURL: "https://us1.locationiq.com/v1/reverse",
  params: {
    key: import.meta.env.VITE_LOCATIONIQ_API_KEY,
    format: "json"
  }
});

export default {
  OPENWETHER_API,
  GEO_API,
  LOCATIONIQ_API
};
