import React, { useContext } from 'react';
import './Card.css';
import { WeatherContext } from '../../Context/WeatherProvider';
import cloud from '../../assets/lightcloud-svgrepo-com.svg'

const Card = () => {
    const { flagURL, selectedCountry, weatherData } = useContext(WeatherContext)
    return (
        <div className='container card-page'>
            <div className="card text-center h-100">
                {!weatherData ? (
                    <>
                        <div className="card-body">
                            <h3>I'm Ready Show the current Weather Report</h3>
                        </div>
                    </>
                ) : (
                    <>
                        {flagURL && (
                            <>
                                <div className="card-header mt-4">
                                    <h3>{selectedCountry}</h3>
                                </div>
                                {/* 9d8804813ca1496a92562425241705 */}
                                <div className="card-body">
                                    <div className="img-container">
                                        <img src={flagURL} alt={`${selectedCountry} flag`} />
                                    </div>
                                    {weatherData && (
                                        <div className='weather-data'>
                                            <h2>{weatherData.location.name}</h2>
                                            <p><img width='50px' height='50px' style={{margin:'0',padding:'0'}} src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} /> {weatherData.current.condition.text}</p>
                                            <div className="report d-flex">
                                                <p>Cloud: {weatherData.current.cloud}</p>
                                                <p>Temperature: {weatherData.current.temp_c}°C</p>
                                                <p>Humidity: {weatherData.current.humidity}%</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;