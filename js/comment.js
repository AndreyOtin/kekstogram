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

export { createComments, createSocialCommentsElement };
