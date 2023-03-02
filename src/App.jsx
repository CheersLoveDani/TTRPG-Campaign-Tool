import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import MapNavigator from './components/map-viewer/MapNavigator'
import "./App.scss";
import { KeepScale } from "react-zoom-pan-pinch";

function App() {

  return (
    <div className="container">
      
      <MapNavigator className="map-navigator">
        <div className="map-container"
          style={{
            display: "flex",
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(138deg, rgba(0,255,239,1) 0%, rgba(44,255,0,1) 25%, rgba(0,44,255,1) 49%, rgba(255,0,0,1) 78%, rgba(255,0,69,1) 100%);'
          }}
        >
          <div className="img-container">
            <img src="src\assets\test1.png" />
            <KeepScale className="pin-container">
            <div className="pin"></div>
          </KeepScale>
          </div>
          
        </div>
      </MapNavigator>
    </div>
  );
}

export default App;
