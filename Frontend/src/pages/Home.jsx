import React, { useState } from 'react'
import Map from '../components/Map'
import LocationForm from '../components/LocationForm'

const Home = () => {

  const [MapUpdate, SetMapUpdate  ] =useState("false")
  
  return (
    <div>
      <Map MapUpdate={MapUpdate}/>
      <LocationForm SetMapUpdate={SetMapUpdate}/>
    </div>
  )
}

export default Home
