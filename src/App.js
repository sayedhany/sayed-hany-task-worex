import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [wheatherData, setWheatherData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const date = new Date();
  function getLat(event) {
    console.log(+event.target.value);
    setLat(+event.target.value);
  }
  function getLong(event) {
    console.log(+event.target.value);
    setLong(+event.target.value);
  }
  // useEffect(() => {
  //   fetch(``);
  // }, []);
  function getData(event) {
    event.preventDefault();
    if (!lat && !long) return;
    const data = {
      lat,
      long,
      apiKey: "9f7f43553c3b47d0fa6636d1edfd1f8a",
    };
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.long}&appid=${data.apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWheatherData(data);
      });
  }
  function getDay() {
    let day;
    switch (new Date().getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
    }
    return day;
  }
  return (
    <main>
      <form className="input-container">
        <div className="lat-input">
          <label htmlFor="lat">Lat:</label>
          <input type="text" onChange={getLat} value={lat} />
        </div>
        <div className="long-input">
          <label htmlFor="Long">Long:</label>
          <input type="text" onChange={getLong} value={long} />
        </div>
        <div className="btn-container">
          <button type="button" onClick={getData}>
            Get Wheather Data
          </button>
        </div>
      </form>
      <br />
      {wheatherData && (
        <div className="card-container">
          <p>City Name: {wheatherData.name}</p>
          <p>Day: {getDay()}</p>
          <p>Date: {date.getDate()}</p>
          <p>Temp: {wheatherData.main.temp}</p>
          <p>Humidity: {wheatherData.main.humidity}</p>
          <p>Weather Description: {wheatherData.weather[0].description}</p>
        </div>
      )}
    </main>
  );
}

export default App;
