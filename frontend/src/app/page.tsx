"use client";
import Image from "next/image";
import TemperatureTileComponent from "./components/TemperatureTile/TemperatureTile";
import WeatherForecastTileComponent from "./components/WeatherForecastTile";
import { useEffect, useState } from "react";
import useMqtt from "./hooks/useMqtt";

export default function Home() {
  const [rooms, setRooms] = useState<MqttRoomMessage[]>([]); // Update the type of rooms state
  const { mqttSubscribe, isConnected, payload } = useMqtt();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      <main>
        <div className="bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/*    <div className="mx-auto max-w-2xl sm:text-left">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Lostau
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                A fine day with hints of rain and a late night with clouds.
              </p>
  </div>*/}
            <div className="container mx-auto mt-16 max-w-2xl rounded-3xl sm:mt-20 lg:mx-0  lg:max-w-none">
              <div className="row flex flex-col sm:flex-row -mt-2 p-2 lg:mt-0 lg:w-full">
                {isLoading ? (
                  <div className="col w-full">
                    <div className="card bg-black shadow rounded p-4 m-2 flex flex-col items-center h-full mb-0">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-400"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  rooms.map((room) => (
                    <TemperatureTileComponent
                      temperature={room.temperature}
                      location={room.room}
                      key={room.room}
                    />
                  ))
                )}
              </div>
              <div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>
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
                          <p className="text-lg font-semibold ">Sonnig</p>
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
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-black text-center text-gray-700">
        {/*Last updated: {new Date().toString}*/}
      </footer>
    </>
  );
}
