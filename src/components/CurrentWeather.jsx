export default function CurrentWeather({currentWeather}){
    return(
<div className='weatherSection'>
        <div className='currentWeather'> 
          <img src= {`icons/${currentWeather.weatherIcon}`}  className='weatherIcon'></img>
          <h2 className='temperature'>{currentWeather.temperature}<span>&deg;C</span></h2>
          <p className='description'>{currentWeather.description}</p>
        </div>
      </div>
    )
}