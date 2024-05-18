import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const WeatherContext = createContext()

export const useWeatherContext = () => useContext(WeatherContext)

const WeatherProvider = ({ children }) => {
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [flagURL, setFlagURL] = useState('');
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        fetchCountries();
    }, [])

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/all`);
            const countryData = response.data.map(country => ({
                name: country.name.common,
                cca2: country.cca2,
                capital: country.capital ? country.capital[0] : 'No capital',
                flag: country.flags.svg, // Use the SVG flag URL
            }));
            setCountries(countryData);
            setWeatherData('')
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };


    const getWeather = async () => {
        if (selectedCity) {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=9d8804813ca1496a92562425241705&q=${selectedCountry}`);
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
    };

    return (
        <WeatherContext.Provider value={{ countries, selectedCountry, setSelectedCountry, selectedCity, setSelectedCity, flagURL, setFlagURL, weatherData, getWeather, setWeatherData }} >
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider;