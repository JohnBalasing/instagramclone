import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CountryDetails.css";

const CountryDetails = ({ COUNTRY }) => {
  const [countryInfo, setCountryInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountrydetails = async () => {
        try {
          const response = await axios.get(
            `https://restcountries.com/v3.1/name/${COUNTRY}`
          );
          setCountryInfo(response.data);
          setLoading(false);
        } catch (err) {
          setError("Error fetching data");
          console.error(err);
        }
      };

    fetchCountrydetails();
  },[COUNTRY])

  return (
    loading ? <p>Loading...</p> :
    <div className="country-container">
        <div className="country-card">
          <div>{ countryInfo && countryInfo[0].name.common}</div>
          <img src={countryInfo && countryInfo[0].flags.png} alt={countryInfo[0].flags.alt} className="flag" width="100"/>
          <p><strong>Official Name:</strong> {countryInfo && countryInfo[0].name.official}</p>
          <p><strong>Capital:</strong> {countryInfo && countryInfo[0].capital?.[0]}</p>
          <p><strong>Population:</strong> {countryInfo && countryInfo[0].population.toLocaleString()}</p>
          <p><strong>Region:</strong> {countryInfo && countryInfo[0].region} (countryInfo && {countryInfo[0].subregion})</p>
          <p><strong>Currency:</strong> {countryInfo && Object.values(countryInfo[0].currencies)[0]?.name} ({countryInfo && Object.values(countryInfo[0].currencies)[0]?.symbol})</p>
          <p><strong>Languages:</strong> {countryInfo && Object.values(countryInfo && countryInfo[0].languages).join(", ")}</p>
          <a href={countryInfo && countryInfo[0].maps.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
        </div> 
    </div>
  );
};

export default CountryDetails;
