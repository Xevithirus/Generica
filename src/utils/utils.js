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