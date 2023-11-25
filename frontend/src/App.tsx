import React, { useState } from 'react';
import './App.css';

import config from './app_settings.json';

import mqtt from 'mqtt';

const options = {
	//protocol: 'wss',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'piweather_ui' 	,
  username: config.MQTT_USERNAME,
  password: config.MQTT_PASSWORD,
};
var client  = mqtt.connect(config.MQTT_SERVER, options);

// preciouschicken.com is the MQTT topic
client.subscribe(config.MQTT_TOPIC);

function App() {
  var note: {temperature: number, humidity: number};
  client.on('message', function (topic, message) {
    var msg =JSON.parse(message.toString());
    msg.temperature = parseFloat(msg.temperature).toFixed(2);
    msg.humidity = parseFloat(msg.humidity).toFixed(2);
    // Updates React state with message 
    setMesg(msg);
    console.log(note);
    client.end();
    });

  // Sets default React state 
  const [mesg, setMesg] = useState({temperature: 0, humidity: 0});

  return (
    <div className="App">
    <header className="App-header">
    <h1>PiWeather station</h1>

		<p>temperature: { mesg.temperature }°C</p>
    <p>humidity: { mesg.humidity }%</p>
		</header>
		</div>
  );
}

export default App;
