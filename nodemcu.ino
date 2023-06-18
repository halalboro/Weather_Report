#include <ESP8266WiFi.h>
#include <Arduino.h>
#include <Hash.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <AsyncElegantOTA.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <time.h>
#include <SD_ZH03B.h>
#include <SoftwareSerial.h> 
#include <ESP8266mDNS.h>
#include <ArduinoOTA.h>

// include wpa2 enterprise code
extern "C" {
  #include "user_interface.h"
  #include "wpa2_enterprise.h"
}

// SSID, Username and password. Update with yours!
static const char* ssid = "BITS-STUDENT";
static const char* username = ""; // 
static const char* password = "";

const char* serverName = "https://fw.bits-pilani.ac.in:8090/login.xml";   

const uint8_t fingerprint[20] = {0x47, 0x40, 0x2A, 0xAD, 0x9F, 0x38, 0x4A, 0x40, 0x50, 0x9F, 0x53, 0x5C, 0xC1, 0xBA, 0xD6, 0xBB, 0xFC, 0xBB, 0xE8, 0x3D};

const long utcOffsetInSeconds = 19800;

char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

AsyncWebServer server(80);

#define DHTPIN 2    // Digital pin connected to the DHT sensor

// Uncomment the type of sensor in use:
#define DHTTYPE    DHT11     // DHT 11
//#define DHTTYPE    DHT22     // DHT 22 (AM2302)
//#define DHTTYPE    DHT21     // DHT 21 (AM2301)

DHT dht(DHTPIN, DHTTYPE);

// ESP8266
SoftwareSerial ZHSerial(4, 5); // RX, TX

// set the new SH06 sensor: define in the constructor
SD_ZH03B ZH03B( ZHSerial, SD_ZH03B::SENSOR_ZH06 );

// current temperature & humidity, updated in loop()
String d;
int a=0;
String b;
float t = 0.0;
float h = 0.0;
// Generally, you should use "unsigned long" for variables that hold time
// The value will quickly become too large for an int to store
unsigned long previousMillis = 0;    // will store last time DHT was updated

// Updates DHT readings every 10 minutes
const long interval = 6000; 

unsigned long lastTime = 0;

unsigned long timerDelay = 6000;

const char index_html[] PROGMEM = R"rawliteral(
</html><!DOCTYPE HTML>
<html>
<head>
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <link crossorigin="anonymous" href="https://use.fontawesome.com/releases/v6.3.0/css/all.css" rel="stylesheet">

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
</body>

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
</html>
)rawliteral";

// Replaces placeholder with DHT values
String processor(const String& var){
  //Serial.println(var);
  if(var == "TIME"){
    return String(d);
  }
  else if(var == "TEMPERATURE"){
    return String(t);
  }
  else if(var == "HUMIDITY"){
    return String(h);
  }
  else if(var == "AQI"){
    return String(b);
  }
  return String();
}

void refresh()
{
      //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient https;
    
    std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);

    client->setFingerprint(fingerprint);
      
  // Your Domain name with URL path or IP address with path
  https.begin(*client, serverName);

  // Specify content-type header
  https.addHeader("Content-Type", "application/x-www-form-urlencoded");

  https.addHeader("Set-Cookie", "_ga=GA1.3.722215691.1676912122");

  https.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36");

  https.setReuse("keep-alive");

  // Data to send with HTTP POST
  String httpsRequestData = "mode=191&username=xx&password=xx%23&a=1676990764047&producttype=0";  //username and passwd should be filled

  // Send HTTP POST request
  int httpsResponseCode = https.POST(httpsRequestData);

      //Serial.print("HTTP Response code: ");
      //Serial.println(httpResponseCode);
        
      // Free resources
      https.end();
    }
    else {
      Serial.println("Internet Disconnected");
    }
    lastTime = millis();
}


void readSensorData() {
char printbuf1[80];
   
  if( ZH03B.readData() ) {
    Serial.print( ZH03B.getMode() == SD_ZH03B::IU_MODE ? "IU:" : "Q&A:" );  
    sprintf(printbuf1, "PM1.0, PM2.5, PM10=[%d %d %d]", ZH03B.getPM1_0(), ZH03B.getPM2_5(), ZH03B.getPM10_0() );
    Serial.println(printbuf1);
  } else {   
    Serial.println( "ZH06 Error reading stream or Check Sum Error" );
  } 
}

void setup(){
  // Serial port for debugging purposes
  Serial.begin(9600);
  dht.begin();
  ZHSerial.begin(9600);
  ZH03B.wakeup();
  ZH03B.setInitiativeMode();

  // Setting ESP into STATION mode only (no AP mode or dual mode)
  wifi_set_opmode(STATION_MODE);

  struct station_config wifi_config;

  memset(&wifi_config, 0, sizeof(wifi_config));
  strcpy((char*)wifi_config.ssid, ssid);

  wifi_station_set_config(&wifi_config);
  
  // Clean up to be sure no old data is still inside
  wifi_station_clear_cert_key();
  wifi_station_clear_enterprise_ca_cert();

  wifi_station_set_wpa2_enterprise_auth(1);

  
  wifi_station_set_enterprise_username((uint8*)username, strlen(username));
  wifi_station_set_enterprise_identity((uint8*)username, strlen(username));
  wifi_station_set_enterprise_password((uint8*)password, strlen(password));
  
  wifi_station_connect();
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  timeClient.begin();


  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", index_html, processor);
  });
    server.on("/time", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", String(d).c_str());
  });
  server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", String(t).c_str());
  });
  server.on("/humidity", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", String(h).c_str());
  });
  server.on("/aqi", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", String(b).c_str());
  });

  AsyncElegantOTA.begin(&server);

  // Start server
  server.begin();

  refresh();

}
String c;

void AQItable()
{
    if (a < 30)
    {
      b = "Good";
    }
    else if (30 < a < 60)
    {
      b = "Satisfactory";
    }
    else if (60 < a < 90)
    {
      b = "Moderately Polluted";
    }
    else if (90 < a < 120)
    {
      b = "Poor";
    }
    else if (120 < a < 250)
    {
      b = "Very poor";
    }
    else if (a > 250)
    {
      b = "Severe";
    }
}

void loop() {

  timeClient.update();
  d = timeClient.getFormattedTime();
  
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // save the last time you updated the DHT values
    previousMillis = currentMillis;
    
    readSensorData();
    a = ZH03B.getPM2_5();
    AQItable();
    float newT = dht.readTemperature();

    if (isnan(newT)) {
        Serial.println("Failed to read from DHT sensor!");
    }
    else {
        t = newT;
        Serial.println(t);
    }
      
    float newH = dht.readHumidity();
      
    if (isnan(newH)) {
        Serial.println("Failed to read from DHT sensor!");
    }
    else {
        h = newH;
        Serial.println(h);
    }
  }
}








