import { toggleClass, isEscapeKey } from './dom-util.js';
import { renderComments, clearComments, resetComments, toggleCommentLoaderHiddenState, removeSocialCommentsElement } from './comment.js';

const bigPictureElement = document.querySelector('.big-picture ');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesElement = bigPictureElement.querySelector('.likes-count');
const commentsElement = bigPictureElement.querySelector('.comments-count');
const closeButtonElement = bigPictureElement.querySelector('#picture-cancel');
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader');

let currentComments = {};

const toggleBigPictureHiddenState = () => {
  toggleClass(bigPictureElement, 'hidden');
  toggleClass(document.body, 'modal-open');
  toggleCommentLoaderHiddenState();
};

const setBigPictureEscdown = () => document.addEventListener('keydown', bigPictureEscKeydownHandler);

const removeBigPictureEscKeydown = () => document.removeEventListener('keydown', bigPictureEscKeydownHandler);

const showBigPicture = (data) => {
  currentComments = data.comments;

  imgElement.src = data.url;
  commentsElement.textContent = data.comments.length;
  likesElement.textContent = data.likes;

  toggleBigPictureHiddenState();
  setBigPictureEscdown();
  clearComments();
  renderComments(currentComments);
};

function bigPictureEscKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    removeBigPictureEscKeydown();
    toggleBigPictureHiddenState();
    resetComments();
  }
}

const setBigPictureClose = () => {
  closeButtonElement.addEventListener('click', () => {
    removeBigPictureEscKeydown();
    toggleBigPictureHiddenState();
    resetComments();
  });
};

const setCommentLoaderClick = () => {
  commentLoaderElement.addEventListener('click', () => {
    removeSocialCommentsElement();
    renderComments(currentComments);
  });
};

const setBigPictureEventListeners = () => {
  setBigPictureClose();
  setCommentLoaderClick();
};

export { showBigPicture, setBigPictureEventListeners };
