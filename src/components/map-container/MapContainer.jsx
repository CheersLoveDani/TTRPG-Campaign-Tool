import MapNavigator from './map-viewer/MapNavigator'
import "./map-container.scss";
import { KeepScale } from "react-zoom-pan-pinch";
import { GiCastle } from 'react-icons/gi'
import { useRef, useState } from "react";
import { useRecoilState } from 'recoil'
import { mainMapPositionState, mainMapScaleState } from "../../lib/atoms/mapAtoms";
import MapPin from './map-pin/MapPin';

const MapContainer = () => {
  const ref = useRef(null);
  const [coordinates, setCoordinates] = useState({ x: 500, y: 500 })
  const [mainMapPosition, setMainMapPosition] = useRecoilState(mainMapPositionState);
  const [mainMapScale, setMainMapScale] = useRecoilState(mainMapScaleState);

  const handleMouseDown = (event) => {
    const element = ref.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / mainMapScale;
      const y = (event.clientY - rect.top) / mainMapScale;
      setCoordinates({ x, y });
    }
  };



  return (
    <div className="container">

      <MapNavigator>
        <div className="map-container" ref={ref} onClick={handleMouseDown}>
          <div className="img-container" >
            <img src="src\assets\test1.png" />
            <MapPin coordinates={coordinates} />
          </div>

        </div>
      </MapNavigator>
    </div>
  )
}

export default MapContainer;
