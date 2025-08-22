export default function Search({getWeatherDetails,searchInputref}){
    const API_KEY=import.meta.env.VITE_API_KEY;
    const handleCitySearch=(e)=>{
        e.preventDefault();
        const searchInput=e.target.querySelector(".searchInput")
        const API_URL=`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`
        getWeatherDetails(API_URL)

    }
    const handleLocationSearch=()=>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude,longitude} = position.coords
                const API_URL=`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`
                getWeatherDetails(API_URL)
            },
           (_error)=>{ 
                console.log("Geolocation error:",error)
                alert("Location access denied. Please enable permissions to use the app.");
            }
        )


    }
    return(

        <div className='container'>
             <div className='searchSection'>
                <form action="#" className='searchForm' onSubmit={handleCitySearch}>
                <span className="material-symbols-rounded">search</span>
                 <input type='search' placeholder='Enter City Name' ref={searchInputref} className='searchInput' required></input>
                </form>
                <button className='locationButton' onClick={handleLocationSearch}>
                <span className="material-symbols-rounded">my_location</span>
                 </button>
            </div>
        </div>
    )
}