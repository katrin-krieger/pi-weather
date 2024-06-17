import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import styles from "../../ui/components.module.css";

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
    <div className="temperaturetile">
      <div className={styles.roomcontainer}>
        <div>
          <FaThermometerHalf />
          <span className={styles.measurement}>{temperature}</span>
          <span>°C</span>
        </div>
        <div>
          <WiHumidity />
          <span className={styles.measurement}>{humidity}</span>
          <span>%</span>
        </div>
        <h4 className={styles.location}>{location}</h4>
      </div>
    </div>
  );
};

export default TemperatureTileComponent;
