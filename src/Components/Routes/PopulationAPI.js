import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './PopulationAPI.css';
import people from '../../Assets/people.png'

const PopulationAPI = ({COUNTRY}) => {

const [population, setPopulation] = useState(null);
const [error, setError] = useState(null);
const API_KEY = "nKQrrEUL69UxfcOHzbDH7w==32W68MnsBEBYdOAM"

useEffect(() => {
    const fetchPopulation = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/population?country=${COUNTRY}`,
          {
            headers: { "X-Api-Key": API_KEY }, // API key in headers
          }
        );
        setPopulation(response.data);
        setError(null);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      }
    };

    fetchPopulation();
  }, [COUNTRY]);

  return (
    <div className='population_title'>
      <div>Population Data</div>
      <img src={people} width="80" />
      {error && <p>{error}</p>}
      {population? (
        <div className='population_data'>
          <p>Year: {population.historical_population[0].year}</p>
          <p>Rank: {population.historical_population[0].rank}</p>
          <p>% of World Population: {population.historical_population[0].percentage_of_world_population}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default PopulationAPI