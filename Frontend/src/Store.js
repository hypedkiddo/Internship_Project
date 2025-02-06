import { create } from "zustand";

const IpStore = create((set) => ({
    IP: ("192.168.1.107"),  // Replace with your ESP32's IP
    setIP: (newIP) => set({ IP: newIP }),
  }))


  const UseLocationStore = create((set) => ({
    Location: { latitude: 15.81441135731113, longitude: 74.48864107023633,Address:"" }, 
    setLocation: (data) => set({ latitude: data.latitude, longitude: data.longitude, Address: data.address}),
  }))

  const UseReportStore = create((set) => ({
    data: {  }, 
    setData: (datas) => set({data:datas}),
  }))

  export  {IpStore,UseLocationStore,UseReportStore};



