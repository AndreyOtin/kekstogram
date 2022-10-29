import { createRandomElementsArray, getRandomNumber } from './util.js';

const NUMBER_OF_PHOTOS = 25;

const NUMBERS = Array.from({ length: NUMBER_OF_PHOTOS }, (_, i) => i + 1);

const NAMES = ['Марина', 'Саша', 'Маша', 'Федя', 'Леша', 'Соша'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const createDataFiller = ({ids, photos}) => (_, i) => {
  const avatarNumbers = createRandomElementsArray(NUMBERS.slice(0, 6));

  return {
    id: ids[i],
    url: `photos/${photos[i]}.jpg`,
    description: 'Классное фото',
    likes: getRandomNumber(15, 200),
    comments: Array.from({ length: avatarNumbers.length }, (__, j) => ({
      id: j,
      avatar: `img/avatar-${avatarNumbers[j]}.svg`,
      message: createRandomElementsArray(MESSAGES, getRandomNumber(1, 2)).join(' '),
      name: NAMES[avatarNumbers[j] - 1]
    }))
  };
};

const generateData = (count = NUMBER_OF_PHOTOS) => Array.from({ length: count }, createDataFiller({
  ids: createRandomElementsArray(NUMBERS, NUMBER_OF_PHOTOS),
  photos: createRandomElementsArray(NUMBERS, NUMBER_OF_PHOTOS),
}));

export { generateData };
