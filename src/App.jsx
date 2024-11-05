import { useState, useEffect } from "react";
import axios from "axios";
import Card from './components/Card';
import {
  atmosphereSvg,
  cloudSvg,
  clearSvg,
  drizzleSvg,
  rainSvg,
  snowSvg,
  thunderstormSvg,
} from './assets/images/images/index.js'
import conditionCodes from "./components/helpers/conditionCode.js";
import key from "./components/helpers/key.js";
import url from "./components/helpers/url.js";
import './App.css'

const icons = { 
  thunderstorm: thunderstormSvg,
  drizzle: drizzleSvg,
  rain: rainSvg,
  snow: snowSvg,
  atmosphere: atmosphereSvg,
  clear: clearSvg,
  clouds: cloudSvg,
}
  

const initialState = {
  latitude: 0,
  longitude: 0,
};

function App() {
  const [coords, setCoords] = useState(initialState);
  const [weather, setWeather] = useState({});
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    console.log(
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
        },
        (error) => {
          console.log("No aceptaste la ubicación");
        }
      )
    );
  }, []);

  useEffect(() => {
    if (coords) {
      axios
        .get(
          `${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`
        )
        .then((res) => {
          const keys = Object.keys(conditionCodes)
          const iconName = keys.find(key => conditionCodes[key].includes(res.data?.weather[0]?.id))
          setWeather({
            city: res.data?.name,
            country: res.data?.sys?.country,
            icon: icons[iconName],
            main: res.data?.weather[0]?.main,
            wind: res.data?.wind?.speed,
            clouds: res.data?.clouds?.all,
            pressure: res.data?.main?.pressure,
            temperature: parseInt(res.data?.main?.temp) - 274
          });
        })
        .catch((err) => {
          
        });
    }
  }, [coords]);

  return(
<div>
<Card 

weather={weather} 
toggle={toggle} 
setToggle={setToggle} 
/>



</div>

)
}

export default App
