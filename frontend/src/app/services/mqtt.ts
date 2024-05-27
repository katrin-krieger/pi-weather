import mqtt from "mqtt";

const client = mqtt.connect("wss://localhost:9001");
client.on("connect", function () {
  console.log("Connected to MQTT broker");
  // Subscribe to a topic
  client.subscribe("temperature", function (err) {
    if (!err) {
      console.log("Subscribed to temperature topic");
    }
  });
});
