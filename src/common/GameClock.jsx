// GameClock.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ClockContext = createContext();

export const useClock = () => useContext(ClockContext);

const GameClockProvider = ({ children }) => {
    const months = [
        'Ianuarius', 'Februarius', 'Martius', 'Aprilis', 'Maius', 'Iunius', 
        'Quintilis', 'Sextilis', 'September', 'October', 'November', 'December'
    ];
    const daysOfWeek = [
        'Dies Solis', 'Dies Lunae', 'Dies Martis', 'Dies Mercurii', 'Dies Iovis', 'Dies Veneris', 'Dies Saturni'
    ];
    const seasons = ['Hiems', 'Ver', 'Aestas', 'Autumnus'];

    const [date, setDate] = useState({
        hour: 12,
        minute: 0,
        period: 'AM',
        dayOfWeek: 'Dies Saturni', // Saturday
        month: 'October',
        dayOfMonth: 31,
        year: 1486,
        season: 'Autumnus'
    });

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
                    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                    if (dayOfMonth > daysInMonth[monthIndex]) {
                        dayOfMonth = 1;
                        month = months[(monthIndex + 1) % 12];
                        if (month === 'Ianuarius') {
                            year += 1;
                        }
                    }
                }
            }

            const monthIndex = months.indexOf(month);
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


