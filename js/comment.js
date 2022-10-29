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

export { createComments };
