const MINUTES_PER_HOUR = 60;

export const getDurationTime = (timeInMs) => {
  const days = Math.floor(timeInMs / (1000 * MINUTES_PER_HOUR * MINUTES_PER_HOUR * 24)).toString().padStart(2, `0`);
  const hours = (Math.floor(timeInMs / (1000 * MINUTES_PER_HOUR * MINUTES_PER_HOUR)) % 24).toString().padStart(2, `0`);
  const minutes = (Math.floor(timeInMs / (1000 * MINUTES_PER_HOUR)) % MINUTES_PER_HOUR).toString().padStart(2, `0`);
  const outputDays = days > 0 ? `${days}D ` : ``;
  let outputHours = `${hours}H `;

  if (days === 0) {
    outputHours = hours > 0 ? `${hours}H ` : ``;
  }

  return `${outputDays}${outputHours}${minutes}M`;
};

export const ucFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
