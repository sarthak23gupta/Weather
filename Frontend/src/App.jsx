import React, { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'


const App = () => {

  const [tempValue, setTempValue]=useState('')
  const [location, setLocation]=useState("Delhi")
  const [humidity, setHumidity]=useState('')
  const [minTemp, setMinTemp]=useState('')
  const [maxTemp, setMaxTemp]=useState('')
  const [inputCity, setInputCity]=useState('')

  const user =useSelector((state)=>state.user.value)

  const VITE_WeatherAPIKey=import.meta.env.VITE_WeatherAPIKey

  const handleChange=(e)=>{
    console.log(e.target.value);
    setInputCity(e.target.value)
  }

  const celcius=(kelvin)=>{
    const celTemp=kelvin-273.15
    return Math.round(celTemp)
  }

  const navigate=useNavigate();

  const handleSearch=()=>{
    setLocation(inputCity)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${VITE_WeatherAPIKey}`)
    .then(response=>response.json())
    .then(data=>{
      // console.log(data);
      // setTempValue(celcius(data.main.temp))
      setTempValue(celcius(data.main.temp))
      setHumidity(data.main.humidity)
      setMinTemp(celcius(data.main.temp_min))
      setMaxTemp(celcius(data.main.temp_max))
    })
  }

  useEffect(()=>{
    if(!user)
    {
      navigate('/login')
    }
    // if(!localStorage.getItem('user'))
    // {
    //   navigate('/login')
    // }

    

     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${VITE_WeatherAPIKey}`)
    .then(response=>response.json())
    .then(data=>{
      // console.log(data);
      // setTempValue(celcius(data.main.temp))
      setTempValue(celcius(data.main.temp))
      setHumidity(data.main.humidity)
      setMinTemp(celcius(data.main.temp_min))
      setMaxTemp(celcius(data.main.temp_max))
    })

  } , [])

  return (
    <>
    <div>Wether APP</div>
    <div className='container'>
      <div className='flex searchContainer'>

        <div className='searchBar'> 
          <input type="text" value={inputCity} onChange={(e)=>handleChange(e)} />
        </div>

        <div className='searchButton'>
          {/* <button onClick={()=>handleSearch()}>Search</button> */}
          <button onClick={handleSearch}>Search</button>
        </div>

      </div>

      <div className='location'>
        Result for {location}
      </div>

      <div className='tempValue'>
          {tempValue}<sup>o</sup>C
      </div>

      <div className='extraDetails'>
          <ul>
            <li>Humidity:{humidity}%</li>
            <li>Minimum-Temprature:{minTemp}<sup>o</sup>C </li>
            <li>Maximum-Temprature:{maxTemp}<sup>o</sup>C</li>
          </ul>
      </div>
    </div>
    
    </>
  )
}

export default App


