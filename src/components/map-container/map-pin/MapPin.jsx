import { GiCastle } from "react-icons/gi";
import { KeepScale } from "react-zoom-pan-pinch";
import './map-pin.scss'

const MapPin = ({ coordinates }) => {
  return (
    <KeepScale className="pin-point" style={{
      top: coordinates.y,
      left: coordinates.x,
    }}>
      <div className="pin-container">
        <GiCastle className="pin" />
      </div>
    </KeepScale>
  );
};

export default MapPin;
