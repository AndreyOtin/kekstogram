import { isEscapeKey, } from './dom-util.js';

const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');

const typeToElement = {
  success: successMessageTemplateElement,
  error: errorMessageTemplateElement
};

const modalEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
  }
};

const modalClickHandler = () => {
  closeModal();
};

const showModal = (type) => {
  document.body.append(typeToElement[type]);
  document.addEventListener('keydown', modalEscKeydownHandler);
  document.addEventListener('click', modalClickHandler);
};

function closeModal() {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', modalEscKeydownHandler);
  document.removeEventListener('click', modalClickHandler);
}

export { showModal };
