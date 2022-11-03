import { toggleClass, isEscapeKey } from './dom-util.js';
import { createComments, createSocialCommentsElement } from './comment.js';

const bigPictureElement = document.querySelector('.big-picture ');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesElement = bigPictureElement.querySelector('.likes-count');
const commentsElement = bigPictureElement.querySelector('.comments-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const closeButtonElement = bigPictureElement.querySelector('#picture-cancel');
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader');

const NUMBER_OF_COMMENTS = 2;

let current = 0;
let currentComments;

const toggleBigPictureHiddenState = () => {
  toggleClass(bigPictureElement, 'hidden');
  toggleClass(document.body, 'modal-open');

  if (commentLoaderElement.classList.contains('hidden')) {
    toggleClass(commentLoaderElement, 'hidden');
  }
};

const setBigPictureEscdown = () => document.addEventListener('keydown', bigPictureEscKeydownHandler);

const removeBigPictureEscKeydown = () => document.removeEventListener('keydown', bigPictureEscKeydownHandler);

const clearComments = () => {
  commentsContainerElement.innerHTML = '';
  commentsContainerElement.previousElementSibling.remove();
};

const renderComments = (comments) => {
  current = current + NUMBER_OF_COMMENTS > comments.length
    ? comments.length
    : current + NUMBER_OF_COMMENTS;

  if (comments.length === current) {
    toggleClass(commentLoaderElement, 'hidden');
  }

  commentsContainerElement.insertAdjacentHTML('beforebegin', createSocialCommentsElement(current, comments.length));
  commentsContainerElement.insertAdjacentHTML('beforeend', createComments(comments.slice(0, current)));
};

const setCommentLoaderClick = () => {
  commentLoaderElement.addEventListener('click', () => {
    clearComments();
    renderComments(currentComments);
  });
};

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
    current = 0;
  }
}

const setBigPictureClose = () => {
  closeButtonElement.addEventListener('click', () => {
    removeBigPictureEscKeydown();
    toggleBigPictureHiddenState();
    current = 0;
  });
};

const setBigPictureEventListeners = () => {
  setBigPictureClose();
  setCommentLoaderClick();
};

export { showBigPicture, setBigPictureEventListeners };
