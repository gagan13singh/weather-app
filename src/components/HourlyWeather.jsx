import { weatherCodes } from "../constants"
const HourlyWeatherItem=({hourlyWeather})=>{
    const temperature=Math.floor(hourlyWeather.temp_c)
    const time = hourlyWeather.time.split(" ")[1].substring(0, 5)
     const weatherIcon=Object.keys(weatherCodes).find(icon=>weatherCodes[icon].includes(hourlyWeather.condition.code))
    
    return(
        <li className='weatherItem'>
            <p className='time'>{time}</p>
            <img src={`icons/${weatherIcon}.svg`}  className='weatherIcon'></img>
            <p className='temperature'>20 &deg;</p>
          </li>
    )
}
export default HourlyWeatherItem;