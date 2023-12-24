// api/handler.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { time, temperature, humidity, aqi } = req.body;

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
      // Respond with a JSON object containing the data
      return res.status(200).json({ time, temperature, humidity, aqi });
    } catch (error) {
      console.error('Error processing data:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}


