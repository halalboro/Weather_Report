const apiKey = grandeurlgqe4vf369l20jlu8thxh97i;
const accessKey = hi;
const accessToken = "62de417354c0438b48723a9dac82bce57ff861d76be559afb9903b4d4dc09168";


const project = grandeur.init(apiKey, accessKey, accessToken);
project.auth().login("anubhavpanda.2003@gmail.com", "$Rushal5479$");

// This subscribes to the "millis" variable.
project.devices().device(YourDeviceId).data().on("millis", (path, value) => document.getElementById("data").innerHTML = value);
