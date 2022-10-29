const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainerElement = document.querySelector('.pictures');

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


const renderPictures = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((pictureData) => {
    fragment.append(createPicture(pictureData));
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

export { renderPictures, setPictureClick };
