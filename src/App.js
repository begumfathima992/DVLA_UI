import React, { useState } from "react";
import axios from "axios";
import Home from "./page/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Vehicle from "./page/vehicle";

function App() {
  const [vrm, setVrm] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookupVehicle = async () => {
    if (!vrm) return;
    setLoading(true);
    setError("");
    setVehicle(null);

    try {
      // We clean the input: Remove spaces and force uppercase
      const cleanVrm = vrm.replace(/\s+/g, "").toUpperCase();
      const response = await axios.post("http://localhost:5000/api/vehicle", {
        registrationNumber: cleanVrm,
      });
      setVehicle(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Vehicle not found. Try a real registration.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#005ea5' }}>DVLA Vehicle Enquiry</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          style={{ padding: '10px', fontSize: '16px', flex: 1, border: '2px solid #0b0c0c' }}
          value={vrm} 
          onChange={(e) => setVrm(e.target.value)} 
          placeholder="Enter Reg (e.g. LR19GKF)"
        />
        <button 
          onClick={lookupVehicle}
          style={{ padding: '10px 20px', background: '#00703c', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div style={{ color: '#d4351c', fontWeight: 'bold' }}>{error}</div>}

      {vehicle && (
        <div style={{ background: '#f3f2f1', padding: '20px', borderLeft: '5px solid #005ea5' }}>
          <h3 style={{ marginTop: 0 }}>{vehicle.registrationNumber}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #bfc1c3' }}><strong>Make</strong></td><td>{vehicle.make}</td></tr>
              <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #bfc1c3' }}><strong>Color</strong></td><td>{vehicle.colour}</td></tr>
              <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #bfc1c3' }}><strong>Tax Status</strong></td><td>{vehicle.taxStatus}</td></tr>
              <tr><td style={{ padding: '8px 0', borderBottom: '1px solid #bfc1c3' }}><strong>MOT Status</strong></td><td>{vehicle.motStatus}</td></tr>
              <tr><td style={{ padding: '8px 0' }}><strong>Year</strong></td><td>{vehicle.yearOfManufacture}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-vehicle" element={<Vehicle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
