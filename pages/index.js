// pages/index.js
import React from 'react';

const HomePage = () => {
    return (
                <html>
                <div>
                  <meta content="width=device-width, initial-scale=1" name="viewport" />
                  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.3.0/css/all.css" crossOrigin="anonymous" />
                  <link rel="apple-touch-icon" sizes="180x180" href="/resources/apple-touch-icon.png" />
                  <link rel="icon" type="image/png" sizes="32x32" href="/resources/favicon-32x32.png" />
                  <link rel="icon" type="image/png" sizes="16x16" href="/resources/favicon-16x16.png" />
                  <link rel="manifest" href="/resources/site.webmanifest" />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap" rel="stylesheet" />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                  <link href="https://fonts.googleapis.com/css2?family=Bungee:wght@400&display=swap" rel="stylesheet" />
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                  <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap" rel="stylesheet" />
                  <style dangerouslySetInnerHTML={{__html: "\n*{box-sizing: border-box;padding: 0;margin: 0;}\nhtml{max-width: 100vw;max-height: 100vh;overflow: hidden;}\n.topright{position: absolute;top: 8px;right: 16px;font-size: 18px;}\n.justify{display: flex;justify-content: center;align-content: center;align-items: center;}\nbody {max-width: 100vw;max-height: 100vh;overflow: hidden;flex-direction: column;background: linear-gradient(-45deg, #371f53, #63458a,#837f87);background-size: 400% 400%;animation: gradient 15s ease infinite;}\n@keyframes gradient { 0%{background-position: 0% 50%;} 50% {background-position: 100% 50%;} 100%{background-position: 0% 50%;}}\n.container {flex-direction: column;overflow: visible;margin-bottom: 3rem;}\n.top {max-width: 50rem;animation: slam-in 0.4s forwards ease-in;}\n.bottom { position: absolute;max-width: 50rem;animation: slam-in 0.65s forwards ease-in;}\n.data {flex-direction: column;}\n@keyframes slam-in {0% {transform: scale(18);} 60% {transform: scale(1);}80% {transform: scale(1.6);}100% {transform: scale(1);}}\n@keyframes slide-in {0% {transform: translateY(50rem);opacity: 0;}50% {transform: translateY(50rem);opacity: 0;}100% {opacity: 1;transform: translateY(0rem);}}\np {\n                            font-size: 2.0rem;\n                        }\n                \n                        p:nth-child(1) {\n                            animation: slide-in 1s forwards ease-out;\n                        }\n                \n                        p:nth-child(2) {\n                            animation: slide-in 1.2s forwards ease-out;\n                        }\n                \n                        p:nth-child(3) {\n                            animation: slide-in 1.4s forwards ease-out;\n                        }\n                        \n                        p:nth-child(4) {\n                            animation: slide-in 1.6s forwards ease-out;\n                        }\n                \n                        .units {\n                            font-size: 1.2rem;\n                            padding-left: 1rem;\n                        }\n                \n                        .dht{\n                            font-size: 1.5rem;\n                            padding-inline: 1rem;\n                        }\n" }} />
                </div>
                <div>
                  <section classname="container justify">
                      <img src="https://cdn.discordapp.com/attachments/557166230595698689/1088611560169148586/weather_only.png" alt="" classname="top" />
                      <img src="https://cdn.discordapp.com/attachments/557166230595698689/1088611560450162758/report_only.png" alt="" classname="bottom" />
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
                    <p style={{fontFamily: 'Kanit'}}>
                      <i className="fa-solid fa-location-dot" style={{color: '#e10e39'}} />
                      <span style={{fontSize: 'x-large'}}>Pilani, RJ</span>
                    </p>
                  </section>
                </div>
                <script>
                function fetchData(url, elementId) {
                      fetch(url)
                        .then(response => response.text())
                        .then(data => {
                          document.getElementById(elementId).innerHTML = data
                        })
                        .catch(error => {
                          console.error('Error fetching data:', error)
                        })
                    }
                
                    setInterval(function () {
                      fetchData("api/handler", "time")
                    }, 1000)
                
                    setInterval(function () {
                      fetchData("api/handler", "temperature")
                    }, 10000)
                
                    setInterval(function () {
                      fetchData("api/handler", "humidity")
                    }, 10000)
                
                    setInterval(function () {
                      fetchData("api/handler", "aqi")
                    }, 10000)
                </script>
                </html>
        );
};

export default HomePage;
