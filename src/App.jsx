import FileStructureContainer from "./components/file-structure/FileStructureContainer";
import MapContainer from "./components/map-container/MapContainer";
import './App.scss'


function App() {
  return (
    <div className="main">
      <div className="layout-container">
        <FileStructureContainer />
        <MapContainer />
      </div>
    </div>
  );
}

export default App;
