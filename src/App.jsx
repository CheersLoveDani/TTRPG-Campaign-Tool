import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import MapNavigator from './components/map-viewer/MapNavigator'
import "./App.scss";
import { KeepScale } from "react-zoom-pan-pinch";
import { GiCastle } from 'react-icons/gi'
import React, { useRef } from "react";
import {useRecoilState} from 'recoil'
import { mainMapPositionState, mainMapScaleState } from "./lib/atoms/mapAtoms";

function App() {
  const ref = useRef(null);
  const [coordinates, setCoordinates] = useState({ x: 500, y: 500 })
  const [mainMapPosition, setMainMapPosition] = useRecoilState(mainMapPositionState);
  const [mainMapScale, setMainMapScale] = useRecoilState(mainMapScaleState);
  

  const handleMouseDown = (event) => {
    const element = ref.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left ) / mainMapScale;
    const y = (event.clientY - rect.top ) / mainMapScale;
      setCoordinates({ x, y });
      // console.log("scale: " + mainMapScale + ", positionX: " + mainMapPosition.x +", positionY: " + mainMapPosition.y);
      console.log(`Clicked at (x: ${x}, y: ${y}) with scale: ${mainMapScale}, mappos: ${mainMapPosition.x}`);
      // console.log(mainMapPosition.x + "/" + mainMapScale + "=" + (mainMapPosition.x / mainMapScale));
      // console.log(Math.round(rect.width / mainMapScale) + " \\ " + event.clientX + Math.round(((mainMapPosition.x / rect.width) * rect.width / mainMapScale)) + " / " + (event.clientX - rect.left) + " asdasd " + event.clientX);
      console.log((mainMapPosition.y/ 50));
    }
  };
  

  return (
    <div className="container">
      
      <MapNavigator className="map-navigator" >
        <div className="map-container" ref={ref} onClick={handleMouseDown}>
          <div className="img-container" >
            <img src="src\assets\test1.png"  />
            <KeepScale className="pin-point" style={{
              top: coordinates.y,
              left: coordinates.x,
            }}>
              <div className="pin-container">
              <GiCastle  className="pin"/>
              </div>
          </KeepScale>
          </div>
          
        </div>
      </MapNavigator>
    </div>
  );
}

export default App;
