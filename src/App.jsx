import "./App.css";
import { useState, useEffect } from "react";

//////////////////////////////////////////////////////////

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
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");
  const [localTime, setLOcalTime] = useState("");
  const [continent, setContinent] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!textInput) {
      setCity("");
      setCountry("");
      setContinent("");
      setDescription("");
      setTemp("");
      setIcon("");
      setHumidity("");
      setHeatIndex("");
      setWindChill("");
      setWind("");
      setLatitude("");
      setLongitude("");
      setDate("");
      setLOcalTime("");
      setError(null);
    }
  }, [textInput]);

  useEffect(() => {
    if (!city) return;
    fetch(`api/weather?city=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setCity(data.location.name);
        setCountry(data.location.country);
        setContinent(data.location.tz_id.split("/"));
        setDescription(
          data.current.condition.text || "No description available"
        );
        setTemp(data.current.temp_c ? `${data.current.temp_c}°C` : "N/A");
        setIcon(data.current.condition.icon || "");
        setWind(`Wind Speed 💨 : ${data.current.wind_mph || "N/A"}mph`);
        setWindChill(`Wind Chill ❄️ : ${data.current.windchill_c || "N/A"}°C`);
        setHumidity(`Humidity 💧: ${data.current.humidity || "N/A"}%`);
        setHeatIndex(`Heat Index ☀️ : ${data.current.heatindex_c || "N/A"}`);
        setLatitude(`Lat:   ${data.location.lat}`);
        setLongitude(`Lon:     ${data.location.lon}`);
        setDate(data.location.localtime.split(" "));
        setLOcalTime(data.location.localtime.split(" "));
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setCity("");
        setCountry("");
        setContinent("");
        setDescription("");
        setTemp("");
        setIcon("");
        setWind("");
        setWindChill("");
        setHumidity("");
        setHeatIndex("");
        setLatitude("");
        setLongitude("");
        setDate("");
        setLOcalTime("");
      });
  }, [city]);

  function handleSearch() {
    if (textInput.trim() !== "") {
      setCity(textInput);
      setIsVisible(true);
      setCountry("");
      setContinent("");
      setDescription("");
      setTemp("");
      setIcon("");
      setWind("");
      setWindChill("");
      setHumidity("");
      setHeatIndex("");
      setError(null);
      setLatitude("");
      setLongitude("");
      setDate("");
      setLOcalTime("");
    }
  }

  function handleInputChange(e) {
    setTextInput(e.target.value);
    if (e.target.value.trim() === "") {
      setIsVisible(false);
    }
  }

  return (
    <>
      <div className="weather-box">
        <h1 className="title">The Weather App</h1>

        <div className="input-box">
          <input
            name="txtInput"
            type="text"
            placeholder="Enter Your City"
            value={textInput}
            onChange={handleInputChange}
          />

          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <p className="quote">
          Bringing you sunshine on rainy days and a forecast you can trust.
        </p>
        <p className="creator">Created By Priscilla Mac-Gatus</p>
        <p>{error}</p>

        <div
          className="display"
          style={{
            visibility: error ? "hidden" : isVisible ? "visible" : "hidden",
          }}
        >
          <div className="section-1">
            <div className="location-box">
              <p>
                {country}, {continent[0]}
              </p>
              <p>{longitude}</p>
              <p>{latitude}</p>
            </div>
            <div className="city-temperature-box">
              <h1>{city}</h1>
              <h2>{temp}</h2>
            </div>
            <div className="icon-description-box">
              {icon && <img src={`https:${icon}`} alt="Weather icon" />}
              <p>{description}</p>
            </div>
          </div>
          <div className="date-box">
            <div className="sub-date-box">
              <p>{date[0]}</p>
            </div>
            <div className="sub-date-box">
              {" "}
              <p>{localTime[1]}</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="sub-feature-box">
              {" "}
              <p>{wind}</p>
            </div>

            <div className="sub-feature-box">
              {" "}
              <p>{windchill}</p>
            </div>

            <div className="sub-feature-box">
              {" "}
              <p>{humidity}</p>
            </div>

            <div className="sub-feature-box">
              {" "}
              <p>{heatindex}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
