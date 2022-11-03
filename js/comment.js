import { toggleClass } from './dom-util.js';

const commentLoaderElement = document.querySelector('.comments-loader');
const commentsContainerElement = document.querySelector('.social__comments');

const NUMBER_OF_COMMENTS = 2;

let renderedCommentsCount = 0;

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
  renderedCommentsCount = 0;
};

const clearComments = () => {
  commentsContainerElement.innerHTML = '';
  commentsContainerElement.previousElementSibling.remove();
};

const renderComments = (comments) => {

  renderedCommentsCount = renderedCommentsCount + NUMBER_OF_COMMENTS > comments.length
    ? comments.length
    : renderedCommentsCount + NUMBER_OF_COMMENTS;

  if (comments.length === renderedCommentsCount) {
    toggleClass(commentLoaderElement, 'hidden');
  }

  commentsContainerElement.insertAdjacentHTML('beforebegin', createSocialCommentsElement(renderedCommentsCount, comments.length));
  commentsContainerElement.insertAdjacentHTML('beforeend', createComments(comments.slice(0, renderedCommentsCount)));
};


const toggleCommentLoaderHiddenState = () => {
  if (commentLoaderElement.classList.contains('hidden')) {
    toggleClass(commentLoaderElement, 'hidden');
  }
};

export { renderComments, clearComments, resetComments, toggleCommentLoaderHiddenState};
