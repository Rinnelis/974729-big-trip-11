export const getRandomMassiveComponent = (massive) => {
  return massive[Math.floor(Math.random() * massive.length)];
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const ucFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
