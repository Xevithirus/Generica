// Utility function to capitalize job and sex values
export const capitalizeField = (job, sex) => {
  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  if (!job && !sex) return '';

  const capitalizedJob = job ? capitalize(job) : '';
  const capitalizedSex = sex ? capitalize(sex) : '';

  return `${capitalizedJob} ${capitalizedSex}`.trim();
};

// Function to determine the Sidebar Player Image source
export const getImageSrc = (character) => {
  const { sex, job } = character;
  if (!sex || !job) return '../images/adventurer-female.png'; // Default image
  return `../images/${job}-${sex}.png`;
};

// Function to determine the Player Profile Image source
export const getProfileImageSrc = (character) => {
  const { sex, job } = character;
  if (!sex || !job) return '../images/adventurer-female.png'; // Default image
  return `../images/${job}-${sex}-profile.png`;
};

// Function to determine whether its night or day
export const isDayTime = (hour, period, season) => {
    const timeInMinutes = (hour % 12) * 60 + (period === 'PM' ? 720 : 0); // Convert to total minutes
    const sunriseTimes = {
        'Hiems': 7 * 60 + 40, // 7:40 AM
        'Ver': 5 * 60 + 30, // 5:30 AM
        'Aestas': 5 * 60 + 30, // 5:30 AM
        'Autumnus': 7 * 60 // 7:00 AM
    };
    const sunsetTimes = {
        'Hiems': 17 * 60, // 5:00 PM
        'Ver': 20 * 60 + 30, // 8:30 PM
        'Aestas': 20 * 60 + 45, // 8:45 PM
        'Autumnus': 16 * 60 + 30 // 4:30 PM
    };

    const sunrise = sunriseTimes[season];
    const sunset = sunsetTimes[season];

    return timeInMinutes >= sunrise && timeInMinutes <= sunset;
};