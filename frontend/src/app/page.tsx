"use client";
import Image from "next/image";
import TemperatureTileComponent from "./components/TemperatureTile/TemperatureTile";
import WeatherForecastTileComponent from "./components/WeatherForecastTile";
import { useEffect, useState } from "react";
import useMqtt from "./hooks/useMqtt";
import styles from "./ui/components.module.css";

export default function Home() {
  const [rooms, setRooms] = useState<MqttRoomMessage[]>([]); // Update the type of rooms state
  const { mqttSubscribe, isConnected, payload } = useMqtt();
  const [isLoading, setIsLoading] = useState(true);

  const [now, setNow] = useState("");

  useEffect(() => {
    setNow(new Date(Date.now()).toISOString());
    if (isConnected) {
      mqttSubscribe("room/#");
    }
  }, [isConnected]);

  useEffect(() => {
    const p: PayloadMessage = payload as PayloadMessage;
    if (p.message) {
      const newMessage: MqttRoomMessage = JSON.parse(p.message);
      const existingRoom = rooms.find((room) => room.room === newMessage.room);
      if (existingRoom) {
        existingRoom.temperature = newMessage.temperature;
        existingRoom.humidity = newMessage.humidity;
        setRooms([...rooms]);
        setIsLoading(false);
        console.log(isLoading);
        console.log(rooms);
      } else {
        const newRooms: MqttRoomMessage[] = [...rooms, newMessage];
        setRooms(newRooms);
        setIsLoading(false);
        console.log(isLoading);
        console.log(rooms);
      }

      //console.log(rooms);
    }
  }, [payload as PayloadMessage]);

  return (
    <>
      <header>
        <h1>pi-weather</h1>
      </header>
      <main>
        <div className={styles.container}>
          <div className={styles.section}>
            <h2>ROOMS</h2>
            <div className="roomssection">
              {rooms.map((r) => (
                <TemperatureTileComponent
                  temperature={r.temperature}
                  location={r.room}
                  humidity={r.humidity}
                  key={r.room}
                  timestamp={r.timestamp}
                />
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h2>FORECAST</h2>
          </div>
        </div>
      </main>
      <footer>Last updated: {now}</footer>
    </>
  );
}
