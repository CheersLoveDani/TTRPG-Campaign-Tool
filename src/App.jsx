import FileStructureContainer from "./components/file-structure/FileStructureContainer";
import MapContainer from "./components/map-container/MapContainer";
import './App.scss'
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="main">
      <div className="layout-container">
        <FileStructureContainer />
        <MapContainer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

// App originally created by:
// _____    _    _   _ ___
// |  _ \  / \  | \ | |_ _|
// | | | |/ _ \ |  \| || |
// | |_| / ___ \| |\  || |
// |____/_/   \_|_| \_|___|

export default App;
