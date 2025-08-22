import './App.css'
import './index.css'
import Search from './components/Search.jsx'
import CurrentWeather from './components/CurrentWeather.jsx'
import HourlyWeather from './components/HourlyWeather.jsx'
import { useEffect, useRef, useState } from 'react'
import { weatherCodes } from './constants.js'
import NoResultsDiv from './components/NoResultDiv.jsx'

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY
  const [currentWeather, setCurrentWeather] = useState({})
  const [hourlyForecasts, sethourlyForecasts] = useState([])
  const searchInputref = useRef(null)
  const [hasNoResults, sethasNoResults] = useState(false)

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0)
    const next24Hours = currentHour + 24 * 60 * 60 * 1000
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime()
      return forecastTime >= currentHour && forecastTime <= next24Hours
    })
    sethourlyForecasts(next24HoursData)
  }

  const getWeatherDetails = async (API_URL) => {
    sethasNoResults(false)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error()
      const data = await response.json()

      const temperature = Math.floor(data.current.temp_c)
      const description = data.current.condition.text
      const weatherIcon = Object.keys(weatherCodes).find(icon =>
        weatherCodes[icon].includes(data.current.condition.code)
      )

      setCurrentWeather({ temperature, description, weatherIcon })

      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ]

      searchInputref.current.value = data.location.name
      filterHourlyForecast(combinedHourlyData)
    } catch {
      sethasNoResults(true)
    }
  }

  useEffect(() => {
    const defaultCity = 'New Delhi'
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`
    getWeatherDetails(API_URL)
  }, [])

  return (
    <div className='container'>
      <Search getWeatherDetails={getWeatherDetails} searchInputref={searchInputref} />
      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className='weatherSection'>
          <CurrentWeather currentWeather={currentWeather} />

          {/* FIXED: hourlyForecast wraps the list */}
          <div className='hourlyForecast'>
            <ul className='weatherList'>
              {hourlyForecasts.map(hourlyWeather => (
                <HourlyWeather
                  key={hourlyWeather.time_epoch}
                  hourlyWeather={hourlyWeather}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
