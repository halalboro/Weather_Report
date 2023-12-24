// pages/index.js
import React from 'react';
import React, { useEffect } from 'react';

const App = () => (
  <>
    <head>
      <meta content="width=device-width, initial-scale=1" name="viewport"/>
      <link crossorigin="anonymous" href="https://use.fontawesome.com/releases/v6.3.0/css/all.css" rel="stylesheet"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/resources/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/resources/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/resources/favicon-16x16.png"/>
      <link rel="manifest" href="/resources/site.webmanifest"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap" rel="stylesheet"/>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=Bungee:wght@400&display=swap" rel="stylesheet"/>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap" rel="stylesheet"/>
      
      <style>
      {`
        *{
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }

        html{
            max-width: 100vw;
            max-height: 100vh;
            overflow: hidden;      
        }
       
        .topright {
            position: absolute;
            top: 8px;
            right: 16px;
            font-size: 18px;
        }


        .justify{
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
        }

        body {
            max-width: 100vw;
            max-height: 100vh;
            overflow: hidden;
            flex-direction: column;
            background: linear-gradient(-45deg, #371f53, #63458a, #837f87);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        .container {
            flex-direction: column;
            overflow: visible;
            margin-bottom: 3rem;
        }

        .top {
            max-width: 50rem;
            animation: slam-in 0.4s forwards ease-in;
        }

        .bottom {
            position: absolute;
            max-width: 50rem;
            animation: slam-in 0.65s forwards ease-in;
        }

        .data {
            flex-direction: column;
        }

        @keyframes slam-in {
            0% {
                transform: scale(18);
            }
            60% {
                transform: scale(1);
            }
            80% {
                transform: scale(1.6);
            }
            100% {
                transform: scale(1);
            }
        }

        @keyframes slide-in {
            0% {
                transform: translateY(50rem);
                opacity: 0;
            }
            50% {
                transform: translateY(50rem);
                opacity: 0;
            }
            100% {
                opacity: 1;
                transform: translateY(0rem);
            }
        }

        p {
            font-size: 2.0rem;
        }

        p:nth-child(1) {
            animation: slide-in 1s forwards ease-out;
        }

        p:nth-child(2) {
            animation: slide-in 1.2s forwards ease-out;
        }

        p:nth-child(3) {
            animation: slide-in 1.4s forwards ease-out;
        }
        
        p:nth-child(4) {
            animation: slide-in 1.6s forwards ease-out;
        }

        .units {
            font-size: 1.2rem;
            padding-left: 1rem;
        }

        .dht{
            font-size: 1.5rem;
            padding-inline: 1rem;
        } 
      `}
      </style>
    </head>
    <body>
    <section className="container justify">
        <img src="https://cdn.discordapp.com/attachments/557166230595698689/1088611560169148586/weather_only.png" alt="" className="top" />
        <img src="https://cdn.discordapp.com/attachments/557166230595698689/1088611560450162758/report_only.png" alt="" className="bottom" />
    </section>
    <section className="data justify">
        <p className="justify" style={{fontFamily: 'Bungee'}}>
            <span className="dht">Time</span>
            <span id="time">%TIME%</span>
            <sup className="units">Hours</sup>  
        </p>
        <p className="justify" style={{fontFamily: 'Bungee'}}>
            <span className="dht">Temperature</span>
            <span id="temperature">%TEMPERATURE%</span>
            <sup className="units">°C</sup>
        </p>
        <p className="justify" style={{fontFamily: 'Bungee'}}>
            <span className="dht">Humidity</span>
            <span id="humidity">%HUMIDITY%</span>
            <sup className="units">percent</sup>
        </p>
        <p className="justify" style={{fontFamily: 'Bungee'}}>
            <span className="dht">AQI</span>
            <span id="aqi">%AQI%</span>
        </p>
    </section>
    <section className="topright">
        <p style={{fontFamily:'Kanit'}}>
        <i className="fa-solid fa-location-dot" style={{color: '#e10e39'}}></i>
        <span style={{fontSize: 'x-large'}}>Pilani, RJ</span>
        </p>
    </section>
    </body>

function App() {
  const fetchData = (url, elementId) => {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    const intervals = [
      setInterval(() => fetchData("api/handler", "time"), 1000),
      setInterval(() => fetchData("api/handler", "temperature"), 10000),
      setInterval(() => fetchData("api/handler", "humidity"), 10000),
      setInterval(() => fetchData("api/handler", "aqi"), 10000)
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div>
      <div id="time"></div>
      <div id="temperature"></div>
      <div id="humidity"></div>
      <div id="aqi"></div>
    </div>
  );
}
</>

export default App;
