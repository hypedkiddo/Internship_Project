import React, { useEffect, useState } from 'react';
import { UseLocationStore } from '../Store';

const Map = ({MapUpdate}) => {
    const [location, setLocation] = useState({ latitude: 15.81441135731113, longitude: 74.48864107023633 });
    const [error, setError] = useState(null);
    const [locationName, setLocationName] = useState('');
    const SetLocation = UseLocationStore((state)=> state.setLocation)
  useEffect(()=>{
    handleConvert(location)
  },[location])

  useEffect(()=>{
    if(MapUpdate === true){

      getLocation();
    }
  },[MapUpdate])
  const handleConvert = async (location) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.display_name) {
        console.log(data)
        setLocationName(data.display_name);
        SetLocation({latitude:location.latitude, longitude:location.longitude ,address: data.display_name})
      } else {
        setLocationName('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocationName('Error occurred');
    }
  };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setError(null);


            handleConvert(location); // Fetch and update location name upon location change
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    

  const zoomLevel = 17;         // Zoom level
  
  const mapSrc = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=${zoomLevel}&output=embed`;




  return (
    <div>
 
      <div style={{ width: '100vw', height: '60vh' }}>
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          src={mapSrc}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>



      <div>
      {/* <button onClick={getLocation} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get Location
      </button> */}
      {location.latitude && location.longitude ? (
        <div className='flex justify-center '>
          {/* <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p> */}
          <p>Location : {locationName}</p>

        </div>
      ) : (
        <p>{error || "Click the button to get location"}</p>
      )}
    </div>
    </div>
  );
};

export default Map;
