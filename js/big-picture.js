import { toggleClass, isEscapeKey } from './dom-util.js';


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

const toggleBigPicture = () => {
  toggleClass(bigPictureElement, 'hidden');
  toggleClass(commentsCountContainerElement, 'hidden');
  toggleClass(commentLoaderElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

function closeBigPicture() {
  toggleBigPicture();
  document.removeEventListener('keydown', bigPictureEscKeydownHandler);
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
}

const createComment = (avatar, name, message) =>
  `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
        <p class="social__text">${message}</p>
</li>
`;

const createComments = (comments) =>
  comments.map(({ avatar, name, message }) => createComment(avatar, name, message)).join('');

const showBigPicture = (data) => {
  toggleBigPicture();
  setBigPictureListeners();

  imgElement.src = data.url;
  commentsElement.textContent = data.comments.length;
  likesElement.textContent = data.likes;

  commentsContainerElement.innerHTML = '';
  commentsContainerElement.innerHTML = createComments(data.comments);
};
export { showBigPicture };
