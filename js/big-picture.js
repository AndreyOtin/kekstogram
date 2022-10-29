import { toggleClass, isEscapeKey } from './dom-util.js';
import { createComments } from './comment';

const bigPictureElement = document.querySelector('.big-picture ');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesElement = bigPictureElement.querySelector('.likes-count');
const commentsElement = bigPictureElement.querySelector('.comments-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const closeButtonElement = bigPictureElement.querySelector('#picture-cancel');
const commentsCountContainerElement = bigPictureElement.querySelector('.social__comment-count');
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader');

const bigPictureEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const closeButtonClickHandler = () => {
  closeBigPicture();
};

const setBigPictureListeners = () => {
  document.addEventListener('keydown', bigPictureEscKeydownHandler);
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
};

const toggleBigPictureHiddenState = () => {
  toggleClass(bigPictureElement, 'hidden');
  toggleClass(commentsCountContainerElement, 'hidden');
  toggleClass(commentLoaderElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

function closeBigPicture() {
  toggleBigPictureHiddenState();
  document.removeEventListener('keydown', bigPictureEscKeydownHandler);
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
}

const showBigPicture = (data) => {
  toggleBigPictureHiddenState();
  setBigPictureListeners();

  imgElement.src = data.url;
  commentsElement.textContent = data.comments.length;
  likesElement.textContent = data.likes;

  commentsContainerElement.innerHTML = '';
  commentsContainerElement.innerHTML = createComments(data.comments);
};
export { showBigPicture };
