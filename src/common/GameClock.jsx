// GameClock.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ClockContext = createContext();

export const useClock = () => useContext(ClockContext);

const GameClockProvider = ({ children }) => {
    const [date, setDate] = useState(() => {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        const period = now.getHours() >= 12 ? 'PM' : 'AM';
        const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
        const month = now.toLocaleDateString('en-US', { month: 'long' });
        const dayOfMonth = now.getDate();
        const year = now.getFullYear();
        const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
        const season = seasons[Math.floor(((now.getMonth() + 1) % 12) / 3)];

        return {
            hour: hours,
            minute: minutes,
            period,
            dayOfWeek,
            month,
            dayOfMonth,
            year,
            season
        };
    });

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];

    const updateClock = (minutesToAdd) => {
        setDate(prevDate => {
            let { dayOfMonth, month, year, dayOfWeek, hour, minute, period, season } = prevDate;
            minute += minutesToAdd;

            while (minute >= 60) {
                minute -= 60;
                hour += 1;
            }

            while (hour > 12) {
                hour -= 12;
                period = period === 'AM' ? 'PM' : 'AM';
                if (period === 'AM') {
                    dayOfWeek = daysOfWeek[(daysOfWeek.indexOf(dayOfWeek) + 1) % 7];
                    dayOfMonth += 1;

                    const monthIndex = months.indexOf(month);
                    const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                    if (dayOfMonth > daysInMonth[monthIndex]) {
                        dayOfMonth = 1;
                        month = months[(monthIndex + 1) % 12];
                        if (month === 'January') {
                            year += 1;
                        }
                    }
                }
            }

            const monthIndex = months.indexOf(month);
            const seasonIndex = seasons.indexOf(season);

            // Update season based on month
            const newSeason = seasons[Math.floor(((monthIndex + 1) % 12) / 3)];

            return { dayOfMonth, month, year, dayOfWeek, hour, minute, period, season: newSeason };
        });
    };

    useEffect(() => {
        const interval = setInterval(() => updateClock(1), 60000); // Update clock every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <ClockContext.Provider value={{ date, updateClock }}>
            {children}
        </ClockContext.Provider>
    );
};

export default GameClockProvider;

