import React from "react";

interface TemperatureTileProps {
  temperature: number;
  location: string;
}

const TemperatureTileComponent: React.FC<TemperatureTileProps> = ({
  temperature,
  location,
}) => {
  return (
    <div className="col w-full">
      <div className="card bg-black shadow rounded p-4 m-2 flex flex-col items-center h-full mb-0">
        <div className="p-16">
          <span className="text-6xl font-bold tracking-tight text-gray-400">
            {temperature}
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-500">
            °C
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
