export const generateRandomNumber = (max, min) => {
  return Math.random() * (max - min) + min;
}