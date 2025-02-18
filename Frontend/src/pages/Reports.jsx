import { useEffect, useState } from "react";
import GasTable from "../components/GasTable";
import GasBarChart from "../components/GasBarChart";
import axios from "axios";
import SensorChart from "../components/SensorChart";
import ReportDownload from "../components/ReportDownload";

const Reports = () => {
    const [data, setData] = useState([]);
    const [graph, setGraph] = useState(false);
    const [report, setReport] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:5000/api/sensor-data")
            .then((res) => {
                console.log("API Response Length:", res.data.length); // Check total documents
                console.log("API Response Data:", res.data); // Log actual response

                if (!Array.isArray(res.data) || res.data.length === 0) {
                    console.warn("No valid sensor data received.");
                    return;
                }

                const processSensorData = (data) => {
                    return data.map((item) => ({
                        place: item.place?.trim() || "Unknown", // Handle missing place
                        CO: item.CO || 0,
                        Benzene: item.Benzene || 0,
                        Butane: item.Butane || 0,
                        CO2: item.CO2 || 0,
                        NH3: item.NH3 || 0,
                        TVOC: item.TVOC || 0,
                    }));
                };

                const processedData = processSensorData(res.data);
                console.log("Processed Data:", processedData);
                setData(processedData);
            })
            .catch((err) => console.error("API Error:", err));
    }, []);

    return (
        <div className="bg-slate-100 p-4">
            <GasTable data={data} />

            <div className="w-full flex justify-end">
                <button
                    onClick={() => setGraph(!graph)}
                    className="bg-orange-300 text-white px-4 py-2 rounded m-2"
                >
                    {graph ? "Close Graph" : "Get Graph"}
                </button>
                <button
                    onClick={() => setReport(!report)}
                    className="bg-green-600 text-white px-4 py-2 rounded m-2"
                >
                    {report ? "Close Report" : "Get Report"}
                </button>
            </div>

            {graph && <SensorChart data={data} />}
            {report && <ReportDownload />}
        </div>
    );
};

export default Reports;
