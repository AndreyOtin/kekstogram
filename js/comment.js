import { toggleClass } from './dom-util.js';

const commentLoaderElement = document.querySelector('.comments-loader');
const commentsContainerElement = document.querySelector('.social__comments');

const NUMBER_OF_COMMENTS = 5;

let commentsStart = 0;
let commentsEnd = NUMBER_OF_COMMENTS;

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

const createSocialCommentsElement = (count, allCount) => `<div class="social__comment-count">${count} из <span class="comments-count">${allCount}</span> комментариев</div>`;

const resetComments = () => {
  commentsStart = 0;
  commentsEnd = NUMBER_OF_COMMENTS;
};

const clearComments = () => {
  commentsContainerElement.innerHTML = '';
  commentsContainerElement.previousElementSibling.remove();
};

const removeSocialCommentsElement = () => commentsContainerElement.previousElementSibling.remove();

const renderComments = (comments) => {
  if (comments.length < commentsEnd) {
    commentsEnd = comments.length;
    toggleClass(commentLoaderElement, 'hidden');
  }

  commentsContainerElement.insertAdjacentHTML('beforebegin', createSocialCommentsElement(commentsEnd, comments.length));
  commentsContainerElement.insertAdjacentHTML('beforeend', createComments(comments.slice(commentsStart, commentsEnd)));

  commentsStart += NUMBER_OF_COMMENTS;
  commentsEnd += NUMBER_OF_COMMENTS;
};

const toggleCommentLoaderHiddenState = () => {
  if (commentLoaderElement.classList.contains('hidden')) {
    toggleClass(commentLoaderElement, 'hidden');
  }
};

export { renderComments, clearComments, resetComments, toggleCommentLoaderHiddenState, removeSocialCommentsElement };
