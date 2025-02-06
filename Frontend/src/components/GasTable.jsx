import React, { useState } from 'react';
import { LuDownload } from "react-icons/lu";
import { UseReportStore } from "../Store";
import { useNavigate } from 'react-router-dom';
const GasTable = ({data,setselectedPlace}) => {
  const [activeRow, setActiveRow] = useState(null);
  // const data = UseReportStore((state)=> state.data)
  const setData = UseReportStore((state)=> state.setData)
  
const Navigate =useNavigate();

  const DonloadReport =(item)=>{
    setData(item);
    Navigate(`/report/${item.place}`)
  }
  return (
    <div className="overflow-x-auto p-6">
      {console.log(data)}
      <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl">
        <table className="min-w-full text-center border-separate border-spacing-0 rounded-2xl">
          <thead>
    
            
              
              
            <tr className="bg-blue-600/90 text-white rounded-t-2xl">
              <th className="px-6 py-4 font-semibold rounded-tl-2xl">Sl No</th>
              <th className="px-6 py-4 font-semibold">Place</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Time</th>
              <th className="px-6 py-4 font-semibold">CO</th>
              <th className="px-6 py-4 font-semibold ">Butane</th>
              <th className="px-6 py-4 font-semibold ">NH3</th>
              <th className="px-6 py-4 font-semibold ">Benzene</th>
              <th className="px-6 py-4 font-semibold">CO2</th>
              <th className="px-6 py-4 font-semibold ">TVOC</th>
              <th className="px-6 py-4 font-semibold rounded-tr-2xl">Action</th>
            </tr>
          </thead>





          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  activeRow === index
                    ? 'bg-blue-200/70'
                    : 'hover:bg-blue-100/70 transition-colors'
                } cursor-pointer`}
                onClick={() => {setActiveRow(index) , setselectedPlace(item.place)}}
              >
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{index + 1}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{ item.place}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{item.DATE}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{item.Time}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{item?.CO?.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{item?.Butane?.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{item?.NH3?.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{item?.Benzene?.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{item?.CO2?.toFixed()}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{item?.TVOC?.toFixed()}</td>
                <td className="px-6 py-4 text-gray-700 border-b border-gray-300" onClick={()=>DonloadReport(item)}> <LuDownload /> </td>
              </tr>
            ))}

         
          
         


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GasTable;
