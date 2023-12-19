import React from "react";
import Image from "next/image";

interface WeatherForecastTileProps {
  temperature: number;
  date: string;
  icon: string;
}

const WeatherForecastTileComponent: React.FC<WeatherForecastTileProps> = ({
  temperature,
  date,
  icon,
}) => {
  return (
    <div className="max-w-sm p-6  rounded-lg shadow">
      <Image src={icon} alt="" width="32" height="32" className="mb-5" />
      <a href="#">
        <span className="text-4xl font-bold tracking-tight ">
          {temperature}
        </span>
        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-500">
          °C
        </span>
        <span className=""> / </span>
        <span className="text-4xl font-bold tracking-tight ">
          {temperature}
        </span>
        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-500">
          °C
        </span>
      </a>
      <p className="mt-3 text-sm">{date}</p>
    </div>
  );
};

export default WeatherForecastTileComponent;
