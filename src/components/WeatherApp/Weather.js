import { useState } from "react";
import axios from "axios";
import Loader, { Circles, CirclesWithBar } from "react-loader-spinner";
function Weather() {
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=d087e1ddfc3d986746779c7ff00796f1`;
  const [input, setInput] = useState("");
  const [weatherReport, setWeatherReport] = useState({});

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=d087e1ddfc3d986746779c7ff00796f1`
        )
        .then((response) => {
          console.log(response.data);
          setWeatherReport(response.data);
          setInput("");
        })
        .catch((err) => {
          console.log(err);
          alert("Print correct location");
        });
    }
  };
  return (
    <div
      className="App"
      style={{
        background: "url(https://wallpaperaccess.com/full/104837.jpg)",
        height: "100vh",
        // backgroundRepeat:'no-repeat',
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <div>
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            autoFocus
            style={{
              width: "300px",
              height: "40px",
              outline: "none",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          />
          <div className="climate_container" style={{ color: "white" }}>
            <>
              <div className="location" style={{ padding: "10px" }}>
                <h1>{weatherReport.name}</h1>
              </div>
              {weatherReport.main && (
                <>
                  {" "}
                  <div
                    className="temperature"
                    style={{ fontSize: "50px", padding: "15px" }}
                  >
                    {weatherReport.main.temp} 'F
                  </div>
                  <div
                    className="climate"
                    style={{ fontSize: "20px", padding: "10px" }}
                  >
                    Mostly {weatherReport.weather[0].main}
                  </div>
                  <div className="feels_like" style={{ padding: "10px" }}>
                    Feels like {weatherReport.main.feels_like}
                  </div>
                  <div className="humidity" style={{ padding: "10px" }}>
                    Humidity {weatherReport.main.humidity}%
                  </div>
                </>
              )}
              {weatherReport.wind && (
                <div className="wind_speed" style={{ padding: "10px" }}>
                  Windspeed {weatherReport.wind.speed}
                </div>
              )}
              {/* <div style={{ textAlign: "center" }}>
                <CirclesWithBar
                  key={0}
                  type="Oval"
                  color="#adadad"
                  height={50}
                  width={50}
                />
              </div> */}
            </>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Weather;
