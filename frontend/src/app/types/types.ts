type MqttRoomMessage = {
  room: string;
  temperature: number;
  humidity: number;
};

type PayloadMessage = {
  topic: string;
  message: string;
};
