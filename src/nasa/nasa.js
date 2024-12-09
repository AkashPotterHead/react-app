import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nasa.css'

const NasaPhoto = () => {
    const [apodData, setApodData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const maxDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        // Replace with your actual Express API endpoint
        console.log("Date = "+ selectedDate)
        const apiUrl = `http://localhost:3001/photo-metadata?date=${selectedDate}`;

        axios
            .get(apiUrl)
            .then((response) => {
                setApodData(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });
            console.log("Date = "+ selectedDate)
    }, [selectedDate]); // Re-run when the selected date changes

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!apodData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Nasa's Photo of the Day</h1>
            <p className="description">View the daily featured image or video from NASA's Astronomy Picture of the Day (APOD) database.</p>
            <div className="calendar-container">
                    <label htmlFor="date-picker">Pick a Date:</label>
                    <input
                        id="date-picker"
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        max={maxDate}
                        min={'1995-07-16'}
                    />
                </div>
            <div className="main-content">
                <h2>{apodData.title}</h2>
                <p>{apodData.date}</p>
                <p>{apodData.copyright && `© ${apodData.copyright.trim()}`}</p>
                <p>{apodData.explanation}</p>
                {apodData.media_type === 'image' ? (
                    <img
                        src={apodData.url}
                        alt={apodData.title}
                    />
                ) : (
                    <a href={apodData.url} target="_blank" rel="noopener noreferrer">
                        View Media
                    </a>
                )}
            </div>
        </div>
    );
};

export default NasaPhoto;
