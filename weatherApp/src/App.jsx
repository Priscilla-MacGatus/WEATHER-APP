import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [textInput, setTextInput] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [heatindex, setHeatIndex] = useState("");
  const [windchill, setWindChill] = useState("");
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState("");

  const APIkey = "4b21d82b866e4836bec110050252502";

  useEffect(() => {
    if (!textInput) {
      setCity("");
      setCountry("");
      setDescription("");
      setTemp("");
      setIcon("");
      setHumidity("");
      setHeatIndex("");
      setWindChill("");
      setWind("");
      setError(null);
    }
  }, [textInput]);

  useEffect(() => {
    if (!city) return;
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}&aqi=no`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setCity(data.location.name);
        setCountry(data.location.country);
        setDescription(
          data.current.condition.text || "No description available"
        );
        setTemp(data.current.temp_c ? `${data.current.temp_c}°C` : "N/A");
        setIcon(data.current.condition.icon || "");
        setWind(`Wind Speed: ${data.current.wind_mph || "N/A"}mph`);
        setWindChill(`Wind Chill: ${data.current.windchill_c || "N/A"}°C`);
        setHumidity(`Humidity: ${data.current.humidity || "N/A"}%`);
        setHeatIndex(`Heat Index: ${data.current.heatindex_c || "N/A"}`);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setCity("");
        setCountry("");
        setDescription("");
        setTemp("");
        setIcon("");
        setWind("");
        setWindChill("");
        setHumidity("");
        setHeatIndex("");
      });
  }, [city]);

  function handleSearch() {
    setCity(textInput);
    setCountry("");
    setDescription("");
    setTemp("");
    setIcon("");
    setWind("");
    setWindChill("");
    setHumidity("");
    setHeatIndex("");
    setError(null);
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter Your City"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />

        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div>
        <div>
          <h1>{city}</h1>
          <p>{country}</p>
        </div>

        <div>
          <h2>{temp}</h2>
          {icon && <img src={`https:${icon}`} alt="Weather icon" />}
          <p>{description}</p>
        </div>

        <div>
          <p>{wind}</p>
          <p>{windchill}</p>
          <p>{humidity}</p>
          <p>{heatindex}</p>
        </div>
      </div>
    </>
  );
}

export default App;
