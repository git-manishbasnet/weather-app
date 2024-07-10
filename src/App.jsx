// import { useEffect } from "react";
// import { useState } from "react";

// function App() {
//   let [city, setCity] = useState("");
//   let [wDetails, setwdetails] = useState();
//   let [loading, setLoading] = useState(false);
//   let [counter, setCounter] = useState(0);
//   let getData = (event) => {
//     setLoading(true);
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric `
//     )
//       .then((res) => res.json())
//       .then((finalRes) => {
//         if (finalRes.cod == "404") {
//           setwdetails(undefined);
//         } else {
//           setwdetails(finalRes);
//         }
//         setLoading(false);
//       });

//     event.preventDefault();
//     setCity("");
//   };

//   useEffect(() => {
//     console.log("Welcome to Weather App");
//   }, [counter]);
//   return (
//     <div className="w-full h-screen bg-[#76c8cc] flex items-center justify-center">
//       <div className="max-w-[1320px] mx-auto text-center">
//         <h1 className="text-[40px] font-bold py-[50px] text-white">
//           Simple Weather App
//         </h1>
//         <form className="mb-10" onSubmit={getData}>
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="w-[300px] h-[40px] pl-3"
//             placeholder="City Name"
//           />
//           <button type="submit" className="bg-green-500 text-white ml-2 p-2">
//             Submit
//           </button>
//         </form>

//         <div className="w-[400px] mx-auto bg-pink-400 shadow-lg p-[25px]">
//           <img
//             src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952zt4wz3c2fr09sbhtbmtk4nyaj69ims40zk5gd81p&ep=v1_gifs_search&rid=200w.gif&ct=g"
//             width={100}
//             className={`absolute left-[37%] ${loading ? "" : "hidden"}`}
//             alt=""
//           />

//           {wDetails !== undefined ? (
//             <>
//               <h3 className="font-bold text-[30px]">
//                 {wDetails.name}
//                 <span className="bg-yellow-300 p-1">
//                   {wDetails.sys.country}
//                 </span>
//               </h3>
//               <h2 className="font-bold text-[40px]">{wDetails.main.temp} °C</h2>
//               <h4>Feels like {wDetails.main.feels_like}°C</h4>
//               <img
//                 src={`https://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
//                 alt="Weather icon"
//               />
//               <p>{wDetails.weather[0].description}</p>
//             </>
//           ) : (
//             "No data found"
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherDetails, setWeatherDetails] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setWeatherDetails(undefined);
        } else {
          setWeatherDetails(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
        setWeatherDetails(null);
      });
    setCity("");
  };

  useEffect(() => {
    console.log("Welcome to Weather App");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-600 flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Simple Weather App</h1>
        <form onSubmit={fetchData} className="mb-6">
          <input
          required
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter City Name"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-3 hover:bg-green-600 transition duration-300"
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </form>

        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
          {loading && (
            <img
              src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952zt4wz3c2fr09sbhtbmtk4nyaj69ims40zk5gd81p&ep=v1_gifs_search&rid=200w.gif&ct=g"
              alt="Loading indicator"
              className="mx-auto mb-4"
              style={{ width: 100 }}
            />
          )}

          {weatherDetails ? (
            <>
              <h2 className="text-2xl font-bold">{weatherDetails.name}, {weatherDetails.sys.country}</h2>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <img
                  src={`https://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`}
                  alt="Weather icon"
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-lg font-semibold">{weatherDetails.main.temp.toFixed(1)} °C</p>
                  <p className="text-sm">Feels like {weatherDetails.main.feels_like.toFixed(1)} °C</p>
                  <p className="text-sm">{weatherDetails.weather[0].description}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-lg text-gray-600">No data found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
