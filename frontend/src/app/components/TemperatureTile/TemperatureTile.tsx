import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

interface TemperatureTileProps {
  temperature: number;
  humidity: number;
  location: string;
}

const TemperatureTileComponent: React.FC<TemperatureTileProps> = ({
  temperature,
  humidity,
  location,
}) => {
  return (
    <div className="col w-full">
      <div className="card bg-black shadow rounded p-4 m-2 flex flex-col items-center h-full mb-0">
        <div className="p-16">
          <FaThermometerHalf />
          <span className="text-6xl font-bold tracking-tight text-gray-400">
            {temperature}
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-500">
            °C
          </span>
        </div>
        <div className="p-16">
          <WiHumidity />
          <span className="text-6xl font-bold tracking-tight text-gray-400">
            {humidity}
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-500">
            %
          </span>
        </div>
        <h4 className="text-lg mb-0 tracking-tight text-gray-500">
          {location}
        </h4>
      </div>
    </div>
  );
};

export default TemperatureTileComponent;
