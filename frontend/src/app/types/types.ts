type MqttRoomMessage = {
  room: string;
  temperature: number;
  humidity: number;
  timestamp: string;
};

type PayloadMessage = {
  topic: string;
  message: string;
};
