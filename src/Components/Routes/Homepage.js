import React, { useState, useEffect } from "react";
import AirPollutionChart from '../Airpollution';
import "./Homepage.css";
import { useAuth } from "../../Context/AuthContext";
import { Country, State, City } from "country-state-city";
import weather from "../../Assets/weather.png";
import clouds from "../../Assets/clouds.png";
import visible from "../../Assets/visible.png";
import eyes from "../../Assets/eyes.png";
import wind from "../../Assets/wind.png";
import hot_weather from "../../Assets/hot_weather.png";
import cold from "../../Assets/cold.png";
import very_hot from "../../Assets/very_hot.png";
import menu_bar from '../../Assets/menu.png';
import PopulationAPI from "./PopulationAPI";
import CountryDetails from "./CountryDetails";
import { Avatar } from "@mui/material";

const Homepage = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [selectedStateCode, setSelectedStateCode] = useState(null);

  const [countries, setCountries] = useState("");
  const [states, setStates] = useState("");
  const [cities, setCities] = useState("");

  const [geoData, setGeoData] = useState({ lat: null, lon: null, state: "" });
  const [currentReport, setCurrentReport] = useState(null);

  const API_KEY = "f492ea4668c17f933b44c158625b7a5a";

  useEffect(() => {
    const fetchLocation = async () => {
      if (!selectedCity) return;
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${API_KEY}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setGeoData({
            lat: data[0].lat,
            lon: data[0].lon,
            state: data[0].state || "Unknown",
          });
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    if (selectedCity) fetchLocation();
  }, [selectedCity]);

  useEffect(() => {
    if (!geoData.lat || !geoData.lon) return;
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        setCurrentReport(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [geoData.lat, geoData.lon]);

  useEffect(() => {
    const countryList = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountries(countryList);
  }, []);

  useEffect(() => {
    if (selectedCountryCode) {
      const stateList = State.getStatesOfCountry(selectedCountryCode).map(
        (state) => ({
          value: state.isoCode,
          label: state.name,
        })
      );
      setStates(stateList);
      setSelectedState(null); // Reset state when country changes
      setCities([]); // Reset cities
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cityList = City.getCitiesOfState(
        selectedCountryCode,
        selectedStateCode
      ).map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCities(cityList);
      setSelectedCity(null); // Reset city when state changes
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    const getCountry = countries.find((item) => item.label === e.target.value);
    setSelectedCountryCode(getCountry.value);
    setSelectedCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    const getState = states.find((item) => item.label === e.target.value);
    setSelectedStateCode(getState.value);
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const getWindDirection = (deg) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(deg / 22.5) % 16];
  };

  console.log("wind", `${getWindDirection(340)} (${340}°)`);
  const { user } = useAuth();

  return (
    <div className="homepage__container">
      <div className="homepage__navigation">
        <div className="nav__item1"><Avatar src={`https://flagsapi.com/${selectedCountryCode}/shiny/64.png`} sx={{ width: 56, height: 56, border: "2px solid #ccc" }}/></div>
        <div className="nav__item2">Geo-Stats Dashboard</div>
        <div className="nav__item3">
          {user ? `Welcome, ${user}! 🎉` : "Hello User!"}
        </div>
      </div>
      <div className="homepage__input">
        <form>
          <select
            value={selectedCountry || ""}
            onChange={handleCountryChange}
            className="select_location"
          >
            <option value="" disabled>
              -- Select a Country --
            </option>
            {[...countries].map((item) => {
              return <option value={item.label}>{item.label}</option>;
            })}
          </select>

          <select
            value={selectedState || ""}
            onChange={handleStateChange}
            className="select_location"
          >
            <option value="" disabled>
              -- Select a State --
            </option>
            {[...states].map((item) => {
              return <option value={item.label}>{item.label}</option>;
            })}
          </select>

          <select
            value={selectedCity || ""}
            onChange={handleCityChange}
            className="select_location"
          >
            <option value="" disabled>
              -- Select a City --
            </option>
            {[...cities].map((item) => {
              return <option value={item.label}>{item.label}</option>;
            })}
          </select>
        </form>
        <form>
          <input
            className="select_location"
            id="lat_long"
            type="number"
            placeholder="Latitude"
            value={geoData.lat}
            readOnly
          />
          <input
            className="select_location"
            id="lat_long"
            type="number"
            placeholder="Longitude"
            value={geoData.lon}
            readOnly
          />
        </form>
      </div>
      <div className="homepage__main">
        <div className="homepage__sidebar">
          <div className="sidebar__container">
            Temperature
            <img src={weather} width="200" />
            {currentReport && currentReport.main ? (
              <div>
                <div className="weather__temperature">
                  🌡️ {currentReport.main.temp.toFixed(2)}°C
                </div>
                <div className="weather__feelslike">
                  Feels like {currentReport.main.feels_like.toFixed(2)}°C
                </div>
                <div className="weather__humidity">
                  Humidity {currentReport.main.humidity}%
                </div>
                <div className="location_details">
                  <p>Country: {selectedCountry}</p>
                  <p>State: {selectedState}</p>
                  <p>City: {selectedCity}</p>
                </div>
              </div>
            ) : (
              <p>Loading temperature...</p>
            )}
          </div>
        </div>
        <div className="homepage_dashboard_bg">
        <div className="homepage__dashboard">
          <div className="dashboard__item">
            {currentReport &&
              currentReport.weather.map((item) => {
                return (
                  <div className="dashboard__clouds">
                    Weather Now
                    <img src={clouds} width="100" />
                    <div className="weather__clouds">{item.main}</div>
                    <div className="weather__clouds">{item.description}</div>
                  </div>
                );
              })}
          </div>
          <div className="dashboard__item">
            {currentReport && (
              <div>
                <div>Visibility</div>
                <img src={eyes} width="100" className="visibility__icon"/>
                <div  className="weather__visibility">{currentReport.visibility / 1000} Km</div>
              </div>
            )}
          </div>

          <div className="dashboard__item">
            {currentReport && (
              <div className="dashboard__wind">
                <div>Wind</div>
                <img src={wind} width="100" />
                <div className="weather__wind">
                  Speed:{(currentReport.wind.speed * 3.6).toFixed(2)} Km/h
                </div>
                <div className="weather__wind">
                  Direction:
                  {`${getWindDirection(currentReport.wind.deg)} ${
                    currentReport.wind.deg
                  }°`}
                </div>
              </div>
            )}
          </div>
          <div className="dashboard__item">
            <PopulationAPI COUNTRY={selectedCountry}/>
          </div>
          <div className="dashboard__item_fullwidth">
            <AirPollutionChart LAT={geoData.lat} LON={geoData.lon} API_KEY={API_KEY}/>
          </div>
          <div className="dashboard__item_fullwidth">
            <CountryDetails COUNTRY={selectedCountry} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
