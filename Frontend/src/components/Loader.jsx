import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseLocationStore } from '../Store';

const Loader = ({formData ,sensorData}) => {
  const [timeLeft, setTimeLeft] = useState(60);
const Navigate = useNavigate();
  const date = new Date();
const DATE = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
 const Time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` 
 const Address = UseLocationStore((state)=>state.Address)     
  useEffect(() => {
console.log(Address)
console.log(DATE,Time)

    if (timeLeft <= 0) return; // Stop countdown when it reaches 0
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    if(timeLeft % 5 === 0){
   
      axios.post("http://localhost:3000/SensorData",{...formData ,...sensorData , DATE,Time,Address})
      .then((res)=> console.log(res))
      .catch((err)=>console.log(err))
    }
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [timeLeft]);


  
  return (
    <div>


 {timeLeft > 0?
    <div className="loader-container flex justify-center items-center flex-col">
      <div className="loader"></div>
      <p className="timer-text">Wait for : {timeLeft}s</p>
      <p className="timer-text"> analyzing specific sensor data</p>
    </div>
:<Link to={"/Reports"}> 
<button 

className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
> Get Report </button></Link>
 }</div>
  );
};

export default Loader;
