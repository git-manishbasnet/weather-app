import { useEffect } from "react";
import { useState } from "react";

function App() {
  let [city, setCity] = useState("");
  let [wDetails, setwdetails] = useState();
  let [loading, setLoading] = useState(false);
  let [counter, setCounter] = useState(0);
  let getData = (event) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric `
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod == "404") {
          setwdetails(undefined);
        } else {
          setwdetails(finalRes);
        }
        setLoading(false);
      });

    event.preventDefault();
    setCity("");
  };

  useEffect(() => {
    console.log("Welcome to Weather App");
  }, [counter]);
  return (
    <div className="w-full h-screen bg-[#76c8cc] flex items-center justify-center">
      <div className="max-w-[1320px] mx-auto text-center">
        <h1 className="text-[40px] font-bold py-[50px] text-white">
          Simple Weather App
        </h1>
        <form className="mb-10" onSubmit={getData}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-[300px] h-[40px] pl-3"
            placeholder="City Name"
          />
          <button type="submit" className="bg-green-500 text-white ml-2 p-2">
            Submit
          </button>
        </form>

        <div className="w-[400px] mx-auto bg-pink-400 shadow-lg p-[25px]">
          <img
            src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952zt4wz3c2fr09sbhtbmtk4nyaj69ims40zk5gd81p&ep=v1_gifs_search&rid=200w.gif&ct=g"
            width={100}
            className={`absolute left-[37%] ${loading ? "" : "hidden"}`}
            alt=""
          />

          {wDetails !== undefined ? (
            <>
              <h3 className="font-bold text-[30px]">
                {wDetails.name}
                <span className="bg-yellow-300 p-1">
                  {wDetails.sys.country}
                </span>
              </h3>
              <h2 className="font-bold text-[40px]">{wDetails.main.temp} °C</h2>
              <h4>Feels like {wDetails.main.feels_like}°C</h4>
              <img
                src={`https://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
                alt="Weather icon"
              />
              <p>{wDetails.weather[0].description}</p>
            </>
          ) : (
            "No data found"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
