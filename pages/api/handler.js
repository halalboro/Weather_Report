let latestData = {
  time: '',
  temperature: '',
  humidity: '',
  aqi: '',
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { time, temperature, humidity, aqi } = req.body;

      // Update latest data
      latestData = { time, temperature, humidity, aqi };

      // Logging received data
      console.log('Received data:');
      console.log('Time:', time);
      console.log('Temperature:', temperature);
      console.log('Humidity:', humidity);
      console.log('AQI:', aqi);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error processing data:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      let responseData;

      switch (req.url) {
        case '/api/time':
          responseData = latestData.time;
          break;
        case '/api/temperature':
          responseData = latestData.temperature;
          break;
        case '/api/humidity':
          responseData = latestData.humidity;
          break;
        case '/api/aqi':
          responseData = latestData.aqi;
          break;
        default:
          return res.status(404).json({ success: false, error: 'Not Found' });
      }

      return res.status(200).json(responseData);
    } catch (error) {
      console.error('Error processing data:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
