// SensorDashboard.js
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import {IpStore} from '../Store';

const SensorDashboard = ({formData}) => {
  const IP = IpStore((state)=>state.IP);
  const [wsStatus ,setwsStatus] =useState("Connecting");
  const [sensorData, setSensorData] = useState({
    CO: 0,
    Butane: 0,
    NH3: 0,
    Benzene: 0,
    CO2: 0,
    TVOC: 0,
    
  });
0
  useEffect(() => {
    const ws = new WebSocket(`ws://${IP}:81`);  // Replace with your ESP32's IP

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensorData(data);  // Update state with received data
    };

    ws.onopen = () => {console.log('Connected to WebSocket');
   setwsStatus("Connected");};
    ws.onclose = () => {console.log('Disconnected from WebSocket'); setwsStatus("Disconnected");};

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 items-center bg-gray-5 p-6 rounded-lg shadow-md w-full justify-center mx-auto mt-10">
      <h2 className=" text-2xl font-semibold mb-6 text-gray-800">Sensor Data Dashboard</h2>
      <p>
        {wsStatus !==  "Connected" ?  "Device Connecting to IP:" : "Device IP :"  }
  {IP} 

  <div className={`text-blue-800 text-center font-bold p-2 bg-yellow-200 ${wsStatus === "Connected" ? "text-green-800" : "text-red-800"}`}>
  {wsStatus}
  </div>
</p>
      <div className=" flex w-full justify-center">
        {Object.entries(sensorData).map(([key, value]) => (
          <div key={key} className=" bg-white p-4 rounded-lg shadow flex flex-col items-center m-3">
            <span className="text-gray-600 font-medium mb-1">{key}</span>
            <span className="text-gray-800 text-xl font-semibold">{value}</span>
          </div>
        ))}
      </div>
{wsStatus !== "Connected"  ? "Wate For Divice Connetion ...." :   <Loader formData={formData} sensorData={sensorData} />
}
    </div>
  );
};

export default SensorDashboard;
