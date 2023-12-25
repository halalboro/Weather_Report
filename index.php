<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <link crossorigin="anonymous" href="https://use.fontawesome.com/releases/v6.3.0/css/all.css" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="/resources/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/resources/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/resources/favicon-16x16.png">
    <link rel="manifest" href="/resources/site.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bungee:wght@400&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap" rel="stylesheet">
    
    <style>
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
    </style>
</head>

<body>
<section class="container justify">
    <img src="https://cdn.discordapp.com/attachments/557166230595698689/1088611560169148586/weather_only.png" alt="" class="top" >
    <img src="https://cdn.discordapp.com/attachments/557166230595698689/1088611560450162758/report_only.png" alt="" class="bottom" >
</section>

<section class="data justify">
    <p class="justify" style="font-family: Bungee">
        <span class="dht">Time</span>
        <span id="time">%TIME%</span>
        <sup class="units">Hours</sup>  
    </p>
    <p class="justify" style="font-family: Bungee">
        <span class="dht">Temperature</span>
        <span id="temperature">%TEMPERATURE%</span>
        <sup class="units">&deg;C</sup>
    </p>
    <p class="justify" style="font-family: Bungee">
        <span class="dht">Humidity</span>
        <span id="humidity">%HUMIDITY%</span>
        <sup class="units">percent</sup>
    </p>
    <p class="justify" style="font-family: Bungee">
        <span class="dht">AQI</span>
        <span id="aqi">%AQI%</span>
    </p>
</section>

<section class="topright">
    <p style="font-family:Kanit">
    <i class="fa-solid fa-location-dot" style="color: #e10e39;"></i>
    <span style="font-size: x-large;">Pilani, RJ</span>
    </p>
</section>

<script>
    setInterval(function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("time").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "/time", true);
        xhttp.send();
    }, 1000);

    setInterval(function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("temperature").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "/temperature", true);
        xhttp.send();
    }, 10000);

    setInterval(function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("humidity").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "/humidity", true);
        xhttp.send();
    }, 10000);

    setInterval(function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("aqi").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "/aqi", true);
        xhttp.send();
    }, 10000);
</script>

</body>
</html>
