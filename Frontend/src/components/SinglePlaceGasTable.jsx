import React from 'react';

const SinglePlaceGasTable = ({ data }) => {
    return (
        <div className="overflow-x-auto p-6">
          <h1>title="co2 Gas Sensor Value</h1>
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl">
                <table className="min-w-full text-center border-separate border-spacing-0 rounded-2xl">
                    <thead>
                        <tr className="bg-blue-600/90 text-white rounded-t-2xl">
                            <th className="px-6 py-4 font-semibold rounded-tl-2xl">Date</th>
                            <th className="px-6 py-4 font-semibold">Time</th>
                            <th className="px-6 py-4 font-semibold rounded-tr-2xl">Gas Value (ppm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, index) => (
                            <tr key={index} className="hover:bg-blue-100/70 transition-colors cursor-pointer">
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{record.date}</td>
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{record.time}</td>
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{record.gasValue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SinglePlaceGasTable;
