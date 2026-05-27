import { useState } from "react";
import "./WeatherCard.css";

export default function WeatherCard() {

    const [city, setCity] = useState("");

    const [weather, setWeather] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const API_KEY = "58dc451af213b929f59a742700eee735";

    const getWeather = async () => {

        if (city.trim() === "") return;

        try {

            setLoading(true);

            setError("");

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            const data = await response.json();

            if (data.cod !== 200) {

                setError("City not found");

                setWeather(null);

                setLoading(false);

                return;
            }

            setWeather(data);

            setLoading(false);

        } catch (err) {

            setError("Something went wrong");

            setLoading(false);
        }
    };

    return (

        <div className="container">

            <div className="weather-card">

                <h1>🌤 Weather App</h1>

                {/* Search */}

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <button onClick={getWeather}>
                        🔍
                    </button>

                </div>

                {/* Loading */}

                {
                    loading && (
                        <div className="loader"></div>
                    )
                }

                {/* Error */}

                {
                    error && (
                        <p className="error">{error}</p>
                    )
                }

                {/* Weather Data */}

                {
                    weather && (

                        <div className="weather-info">

                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                                alt="weather icon"
                            />

                            <h2>
                                {Math.round(weather.main.temp)}°C
                            </h2>

                            <h3>
                                {weather.name}
                            </h3>

                            <p className="description">
                                {weather.weather[0].description}
                            </p>

                            <div className="details">

                                <div className="detail-box">

                                    <h4>💧 Humidity</h4>

                                    <p>
                                        {weather.main.humidity}%
                                    </p>

                                </div>

                                <div className="detail-box">

                                    <h4>🌬 Wind</h4>

                                    <p>
                                        {weather.wind.speed} km/h
                                    </p>

                                </div>

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
}



