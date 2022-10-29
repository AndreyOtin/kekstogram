const checkNumbers = (...numbers) => numbers.every((number) => typeof number === 'number' && number >= 0);

const getRandomDecimal = (min, max, numberOfDecimals = 0) => {
  const isTargetNumbers = checkNumbers(min, max, numberOfDecimals);
  if (!isTargetNumbers) {
    return NaN;
  }

  const [tempMin, tempMax] = min > max ? [max, min] : [min, max];
  const randomNumber = (Math.random() * (tempMax - tempMin) + tempMin);
  return +randomNumber.toFixed(numberOfDecimals);
};

const getRandomNumber = (min, max) => getRandomDecimal(min, max);

const isLenght = (string, length) => string.length <= length;

const findDataElementById = (id, data) => data.find((dataElement) => dataElement.id === id);

const getZeroBasedStringNumber = (number) => number < 10 ? `0${number}` : `${number}`;

const getRandomArrayIndex = (elements) => getRandomNumber(0, elements.length - 1);

const getRandomArrayElement = (elements) => elements[getRandomArrayIndex(elements)];

const createRandomElementsArray = (elements, length) => {
  const arrCopy = [...elements];

  for (let i = arrCopy.length - 1; i > 0; i--) {
    const randomIndex = getRandomNumber(0, i);
    [arrCopy[i], arrCopy[randomIndex]] = [arrCopy[randomIndex], arrCopy[i]];
  }

  const newLength = length ? length : getRandomNumber(1, arrCopy.length);
  return arrCopy.slice(0, newLength);
};

const getLatLngString = ({ lat, lng }, numberOfDecimals = 5) => `lat:${lat.toFixed(numberOfDecimals)}, lng:${lng.toFixed(numberOfDecimals)}`;

const debounce = (cb, delay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb(...rest), delay);
  };
};

export { isLenght, getLatLngString, getRandomArrayElement, createRandomElementsArray, getZeroBasedStringNumber, getRandomNumber, debounce, findDataElementById };
