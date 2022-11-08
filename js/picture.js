const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainerElement = document.querySelector('.pictures');
const pictures = [];

const createPicture = (data) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const imgElement = pictureElement.querySelector('.picture__img');
  const commentsElement = pictureElement.querySelector('.picture__comments');
  const likesElement = pictureElement.querySelector('.picture__likes');

  imgElement.src = data.url;
  imgElement.id = data.id;
  commentsElement.textContent = data.comments.length;
  likesElement.textContent = data.likes;

  return pictureElement;
};

const clearPictures = () => pictures.forEach((picture) => picture.remove());

const renderPictures = (data) => {
  clearPictures();

  const fragment = document.createDocumentFragment();

  data.forEach((pictureData) => {
    const picture = createPicture(pictureData);
    fragment.append(picture);
    pictures.push(picture);
  });

  pictureContainerElement.append(fragment);
};

const setPictureClick = (cb) => {
  pictureContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      cb(+evt.target.id);
    }
  });
};

export { renderPictures, setPictureClick, pictureContainerElement };
