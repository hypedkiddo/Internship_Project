// LocationForm.js
import React, { useState } from 'react';
import SensorDashboard from './SensorDashboard';
import {IpStore} from '../Store';
import axios from 'axios';

const LocationForm = ({SetMapUpdate}) => {

  const [SensorValue, setSensorValue] =useState(false);
  const [formData, setFormData] = useState({
    place: '',
    ipAddress: '',
    position: '',  // Add a new state property for "Position"
  });
const IP = IpStore((state)=>state.IP)
const setIP = IpStore((state)=>state.setIP)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationSelect = () => {
    // Handle location selection logic here
    SetMapUpdate(true)
    console.log("Location selected");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    formData && setIP(formData.ipAddress);   
    axios.get(`http://localhost:3000/SensorData?place=${formData.place}&position=${formData.position}`)
               
    .then((res)=>{
     if(res.data.length  > 1 ){
 alert("Postion already exist")
      setSensorValue(false)
     }else{
      
     }
    }).catch(err=>console.log(err))
    setSensorValue(!SensorValue)
    // Add form submission logic here
  };

  return (
    <div>
      {console.log(IP)}
    {!SensorValue ? 
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Location Information</h2>
        
        {/* Place Field */}
        <div className="mb-4">
          <label htmlFor="place" className="block text-gray-700 font-medium mb-2">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the place name"
          />
        </div>
        
        {/* IP Address Field */}
        <div className="mb-4">
          <label htmlFor="ipAddress" className="block text-gray-700 font-medium mb-2">IP Address</label>
          <input
            type="text"
            id="ipAddress"
            name="ipAddress"
            value={formData.ipAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter IP address"
          />
        </div>
        
        {/* Position Field */}
        <div className="mb-4">
          <label htmlFor="position" className="block text-gray-700 font-medium mb-2">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter position"
          />
        </div>
        
        {/* Select Location Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleLocationSelect}
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Select Location
          </button>
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>



    </div>
:<div>
<button
           onClick={()=> setSensorValue(!SensorValue)}
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Create New Place
          </button>
<SensorDashboard  formData={formData}/> 
</div>
}
    </div>
  );
};

export default LocationForm;
