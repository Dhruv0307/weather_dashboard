import React, { useEffect, useState } from 'react';
import './CountryTime.css';

function CountryTime() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update the time every second
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const country = "India";
    const time = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const date = currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });

    return (
        <div className='country_time_date'>
            <p className='country'>{country}</p>
            <h1 className='time'>{time}</h1>
            <p className='date'>{date}</p>
        </div>
    );
}

export default CountryTime;
