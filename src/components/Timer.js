import React, { useState, useRef } from 'react';
import '../App.css';

function Timer() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    const startTimer = () => {
        setIsActive(true);
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
        }, 10);
    };

    const stopTimer = () => {
        setIsActive(false);
        clearInterval(intervalRef.current);
    };

    const lapTimer = () => {
        setLaps([...laps, time]);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setTime(0);
        setIsActive(false);
        setLaps([]);
    };

    const formatTime = (timeInMilliseconds) => {
        const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10); // Get milliseconds
        const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
        const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
        const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer-container">
            <div className="timer">{formatTime(time)}</div>
            <div className="btn-container">
                <button className={`btn ${isActive ? 'active' : ''}`} onClick={isActive ? stopTimer : startTimer}>
                    {isActive ? 'Stop' : 'Start'}
                </button>
                <button className="btn" onClick={lapTimer} disabled={!isActive && time === 0}>
                    Lap
                </button>
                <button className="btn" onClick={resetTimer}>
                    Reset
                </button>
            </div>
            <div>
                <h2>Laps</h2>
                <ul className="laps-list">
                    {laps.map((lap, index) => (
                        <li key={index}>{formatTime(lap)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Timer;
