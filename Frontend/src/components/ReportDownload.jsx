import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UseLocationStore, UseReportStore } from '../Store';
import { CgLayoutGrid } from 'react-icons/cg';

// Sample data representing gas values
const initialGasData = {
    CO: 0,
    NH3: 0,
    Benzene: 0,
    CO2: 0,
    // TVOC: 0, 
};

// Reference values for each gas type
const gasThresholds = {
  CO: 25,
  NH3: 27,
  Benzene: 10
,
  CO2: 2000,
  // TVOC: 1,
};

const ReportDownload = () => {
  const [gasData, setGasData] = useState(initialGasData);
  const data = UseReportStore((state)=>state.data)

  useEffect(() => {
    // Example: code to fetch real-time gas data from your sensors
    setGasData({  CO: data.CO?.toFixed(2) ,
        NH3: data.NH3?.toFixed(2) ,
        Benzene: data.Benzene?.toFixed(2),
        CO2: data.CO2?.toFixed(),
        TVOC: data.TVOC?.toFixed() ,});
    console.log(data)
  }, []);

  const calculateAirQuality = () => {
    const exceededThresholds = Object.keys(gasData).filter(
      (gas) => gasData[gas] > gasThresholds[gas]
    ).length;

    if (exceededThresholds === 0) return 'Good';
    if (exceededThresholds <= 2) return 'Moderate';
    return 'Poor';
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("reportContent");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("gas_report.pdf");
    });
  };

  const airQuality = calculateAirQuality();
  const healthStatement = {
    Good: 'Air quality is Good for human health. No immediate health risks are present.',
    Moderate: 'Air quality is Moderate. Sensitive groups may experience mild health issues.',
    Poor: 'Air quality is Poor. Prolonged exposure can lead to adverse health effects, particularly for vulnerable groups.',
  };

  return (
    <div className="p-8  font-sans" id="reportContent">
      <h1 className="text-3xl font-bold text-center mb-6 border-b border-black p-3">
        KLS GIT
      </h1>
      <div className='border-b border-black p-3'>
      
        <h2>Place : {data.place} </h2>
        <h2>Date : {data.DATE} </h2>
        <h2>Time : {data.Time} </h2>
       

        <h2>Address :{data.Address} </h2>
       
      </div>
    
      <p className=" text-lg mb-4 p-4">
        Air Quality Status: <span className={`font-semibold ${airQuality === 'Good' ? 'text-green-600' : airQuality === 'Moderate' ? 'text-yellow-600' : 'text-red-600'}`}>
          {airQuality}
        </span>
      </p>
      
      <div className="w-full mb-6">
        {Object.keys(gasData).map((gas) => (
          <div key={gas} className="p-4  bg-white w-full shadow">
            <h4 className="   flex"> <div className='font-semibold'>{gas} Level :</div> <div>{gasData[gas]} ppm</div></h4>
            {gasData[gas] > gasThresholds[gas] ? (
              <p className="text-red-600 font-semibold">
                Warning! {gas} level is hazardous for human health and should avoid inhaling it!
              </p>
            ) : (
              <p className="text-green-600 font-semibold">Safe</p>
            )}
          </div>
        ))}
      </div>

      {/* Health Conclusion */}
      <div className={`p-4 rounded-lg text-center font-bold ${airQuality === 'Good' ? 'bg-green-200 text-green-800' : airQuality === 'Moderate' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
        <h3>Conclusion:</h3>
        <p>{healthStatement[airQuality]}</p>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
      >
        Download Air Quality Report as PDF
      </button>
    </div>
  );
};

export default ReportDownload;
