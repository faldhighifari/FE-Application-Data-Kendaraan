import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import AddVehicleData from './pages/AddVehicleData';
import VehicleData from './pages/VehicleData';
import UpdateVehicleData from './pages/UpdateVehicleData';
import DetailVehicleData from './pages/DetailVehicleData';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<VehicleData/>} />
      <Route path="/update-vehicle/:id" element={<UpdateVehicleData/>} />
      <Route path="/add-vehicle" element={<AddVehicleData/>} />
      <Route path="/detail-vehicle/:id" element={<DetailVehicleData/>} />
    </Routes>
  );
}

export default App;
