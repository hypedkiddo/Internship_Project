import { useEffect, useState } from "react";
import GasTable from "../components/GasTable";
import GasBarChart from "../components/GasBarChart"
import axios from "axios";
import SensorChart from "../components/SensorChart";
import ReportDownload from "../components/REportDownload";

const Reports = () => {
    const [data, setdata]=useState([{}]);
    const [graph ,setgraph] =useState(false);
    const [Report ,setReport] =useState(false);
    const [selectedPlace ,setselectedPlace]=useState("");
  useEffect(()=>{
    axios.get("http://localhost:3000/SensorData")
    .then((res)=>  {
       

        const averageSensorDataByPlace = (data) => {
            const groupedData = data.reduce((acc, item) => {
              // Group by unique place
              if (!acc[item.place]) {
                acc[item.place] = { ...item, CO: 0, count: 0 };
              }
              // Sum CO and increase count for averaging
              acc[item.place].CO += item.CO;
              acc[item.place].Benzene += item.Benzene;
              acc[item.place].Butane += item.Butane;
              acc[item.place].CO2 += item.CO2;
              acc[item.place].NH3 += item.NH3;
              acc[item.place].TVOC += item.TVOC;
              acc[item.place].count += 1;


            

              return acc;
            }, {});
        
            return Object.values(groupedData).map(({ count, ...item }) => ({
              ...item,
              CO: item.CO / count,
              Benzene:  item.Benzene/count ,
              Butane: item.Butane/count,
              CO2:item.CO2/count ,
              NH3:item.NH3/count ,
              TVOC:  item.TVOC/count ,
      
            })).filter((item)=>item.place && item.place !== "")
          };
      
          const averagedData = averageSensorDataByPlace(res.data);
          setdata(averagedData);
     





    })
    .catch((err=>console.log(err)))
  },[])
  




  return (
    <div className="   bg-slate-100">
        
        <GasTable data={data}/> 
    
    <div className="w-fill flex justify-end">

      <button onClick={()=>{setgraph(!graph)}} className="bg-orange-300 text-white px-4 py-2 rounded m-2">
      {graph ? "Close Graph":  "Get Graph"}
      </button>
      <button onClick={()=>{setReport(!Report)}} className="bg-green-600  text-white px-4 py-2 rounded m-2">
      {Report ? "Close Report":  "Get Report"}
      </button>
    </div>
       {graph ?  <SensorChart data={data}/> : null}
       {Report ?   <ReportDownload/> :""}
      {/* <GasBarChart data={data} selectedPlace={selectedPlace}/> */}
    </div>
  )
}

export default Reports
