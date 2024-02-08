"use client";
import Image from "next/image";
import TemperatureTileComponent from "./components/TemperatureTile";
import WeatherForecastTileComponent from "./components/WeatherForecastTile";
import { useState } from "react";
import * as mqtt from "mqtt";

//const locations = ["Draußen", "Wohnzimmer", "Schlafzimmer"];
const [temp, setTemp] = useState("0");

export default function Home() {
  let client = mqtt.connect("wss://localhost:9001");
  client.on("connect", function () {
    console.log("Connected to MQTT broker");
    // Subscribe to a topic
    client.subscribe("temperature", function (err) {
      if (!err) {
        console.log("Subscribed to temperature topic");
      }
    });
  });

  // Receive messages
  client.on("message", function (topic, message) {
    // message is Buffer
    setTemp(message.toString());
    //client.end()
  });
  return (
    <>
      <main>
        <div className="bg-black py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Lostau
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                A fine day with hints of rain and a late night with clouds.
              </p>
            </div>
            <div className="container mx-auto mt-16 max-w-2xl rounded-3xl sm:mt-20 lg:mx-0  lg:max-w-none">
              <div className="row flex -mt-2 p-2 lg:mt-0 lg:w-full  ">
                <div className="col w-full">
                  <div className="container mx-auto flex flex-wrap">
                    <div className="w-full sm:w-1/3">
                      <div className="flex items-center p-4 bg-black rounded-lg shadow-xs dark:bg-black">
                        <div className="p-3 mr-4 rounded-full">
                          <Image
                            src="/icons/sun.png"
                            alt="sunny"
                            width={64}
                            height={64}
                          />
                        </div>
                        <div>
                          <p className="mb-2 text-sm font-medium">Wetter</p>
                          <p className="text-lg font-semibold ">Sunny</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-2/3">
                      <div className="flex items-center p-4 bg-black  shadow-xs">
                        <div>
                          <p className="mb-2 text-sm font-medium text-gray-500">
                            Vorhersage
                          </p>
                          <WeatherForecastTileComponent
                            temperature={12}
                            date="01.01.2024"
                            icon="/icons/sun.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>
              <div className="row flex flex-col sm:flex-row -mt-2 p-2 lg:mt-0 lg:w-full">
                <TemperatureTileComponent temperature={5} location="Draußen" />
                <TemperatureTileComponent
                  temperature={21}
                  location="Wohnzimmer"
                />
                <TemperatureTileComponent
                  temperature={18}
                  location="Schlafzimmer"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-black text-center text-gray-700">
        Last updated: 2023-19-12 12:34:56
      </footer>
    </>
  );
}
