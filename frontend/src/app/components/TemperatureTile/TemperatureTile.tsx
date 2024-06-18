import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import styles from "../../ui/components.module.css";
import { CiWarning } from "react-icons/ci";
import { IconContext } from "react-icons";

interface TemperatureTileProps {
  temperature: number;
  humidity: number;
  location: string;
  timestamp: string;
}

const TemperatureTileComponent: React.FC<TemperatureTileProps> = ({
  temperature,
  humidity,
  location,
  timestamp,
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
        <h4 className={styles.location}>
          {location}
          {isOutdated(timestamp) ? (
            <IconContext.Provider value={{ className: styles.infoicon }}>
              <CiWarning />
            </IconContext.Provider>
          ) : (
            <div></div>
          )}
        </h4>
      </div>
    </div>
  );
};

function isOutdated(timestamp: string): boolean {
  let ts = new Date(timestamp);
  let now = new Date(Date.now());
  let diff = Math.abs(now.getTime() - ts.getTime()) / 1000;
  console.log(timestamp);
  console.log(ts);
  console.log(ts.getTime());
  console.log(now);
  console.log(now.getTime());
  console.log(diff);
  return diff > 600;
}

export default TemperatureTileComponent;
