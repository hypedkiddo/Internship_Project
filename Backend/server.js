import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import SensorData from './db.js'; // Ensure this file contains your sensor data

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Define Schema & Model
const sensorSchema = new mongoose.Schema({
  place: String,
  ipAddress: String,
  position: String,
  CO: Number,
  Butane: Number,
  NH3: Number,
  Benzene: Number,
  CO2: Number,
  TVOC: Number,
  DATE: String,
  Time: String,
  Address: String
});

const SensorDataModel = mongoose.model('SensorData', sensorSchema);

// Insert Sensor Data into MongoDB
// const  cleardb= async ()=>{
//   await SensorDataModel.deleteMany({});
//   console.log("Database cleared successfully");
// }
// cleardb();

// SensorDataModel.insertMany(SensorData)
//   .then(() => {
//     console.log('Data successfully saved to MongoDB');
//     mongoose.connection.close(); // Close connection after saving data
//   })
//   .catch((err) => {
//     console.error('Error saving data to MongoDB:', err);
//     mongoose.connection.close();
//   });

// API to Save Data
app.post('/api/sensor-data', async (req, res) => {
  try {
    const newData = new SensorDataModel(req.body);
    await newData.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// API to Get Data
app.get('/api/sensor-data', async (req, res) => {
  try {
    console.log("api has hit");
    const data = await SensorDataModel.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Error fetching Data");
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
