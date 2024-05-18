import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './Map.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { MutatingDots } from 'react-loader-spinner';

const MapComponent = ({ position, weatherData }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 13, { duration: 2 });
        }
    }, [position, map]);

    return (
        <>
            {position && (
                <Marker position={position}>
                    <Popup>
                        {weatherData ? (
                            <div>
                                <h4>{weatherData.location.name}</h4>
                                <p><img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} /> {weatherData.current.condition.text}</p>
                                <p>Temperature: {weatherData.current.temp_c}°C</p>
                                <p>Wind speed: {weatherData.current.wind_kph} kph</p>
                                
                            </div>
                        ) : (
                            <p>Loading weather data...</p>
                        )}
                    </Popup>
                </Marker>
            )}
        </>
    );
};

const Map = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [selectedCity, setSelectedCity] = useState('');
    const [position, setPosition] = useState([28.6, 77.2]);
    const [latLng, setLatLng] = useState({ lat: 0, lon: 0 });
    const [loading, setLoading] = useState(false); // State for loading

    useEffect(() => {
        const fetchCityCoordinates = async () => {
            if (selectedCity) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://nominatim.openstreetmap.org/search?city=${selectedCity}&format=json&limit=1`);
                    if (response.data.length > 0) {
                        const { lat, lon } = response.data[0];
                        const newLatLng = { lat: parseFloat(lat), lon: parseFloat(lon) };
                        setLatLng(newLatLng);
                        setPosition([parseFloat(lat), parseFloat(lon)]);
                    } else {
                        console.alert("City not found");
                    }
                } catch (error) {
                    console.error("Error fetching city coordinates: ", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        const fetchWeatherData = async () => {
            if (selectedCity) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=9d8804813ca1496a92562425241705&q=${selectedCity}`);
                    if (response.data && response.data.location) {
                        setWeatherData(response.data);
                    } else {
                        alert("City not found");
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    alert("City not found");
                } finally {
                    setLoading(false);
                }
            }
        };
        

        fetchCityCoordinates();
        fetchWeatherData();
    }, [selectedCity]);

    const handleCitySearch = (e) => {
        e.preventDefault();
        const city = e.target.city.value;
        setSelectedCity(city);
    };

    return (
        <>
            <Navbar />
            <div className='map' style={{ height: '90vh', width: '100%' }}>
                <form onSubmit={handleCitySearch} style={{ marginBottom: '1rem' }}>
                    <div className="search">
                        <div className="search-box">
                            <div className="search-field">
                                <input placeholder="Search..." className="input" name='city' type="text" />
                                <div className="search-box-icon">
                                    <button type='submit' className="btn-icon-content">
                                        <i className="search-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#fff"></path></svg>
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {loading ? (
                    <div className="loader-container">
                        <MutatingDots
                            visible={true}
                            height="100"
                            width="100"
                            color="#ff5900"
                            secondaryColor="#ff5900"
                            radius="12.5"
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                ) : (
                    <MapContainer center={position} zoom={3} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <MapComponent position={position} weatherData={weatherData} />
                    </MapContainer>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Map;
