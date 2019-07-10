import React, { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ location }) => {
    const [ weather, setWeather ] = useState([]);

    useEffect(() => {
        axios
        .get(`https://www.metaweather.com/api/location/search/?query=${location}`)
        .then(response => {
            axios
                .get(`https://www.metaweather.com/api/location/${response.woeid}`)
                .then(response => setWeather(response.data[0]))
        })
    })

    return (
        <div>
            <h3>Weather in {location}</h3>
            <b>Temperature:</b>{weather.the_temp}
        </div>
    )
}

export default Weather;