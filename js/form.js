import { toggleClass, isEscapeKey } from './dom-util.js';
import { pristine } from './pristine-setup.js';

const formElement = document.querySelector('.img-upload__form');
const fileUploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const formCloseButtonElement = formElement.querySelector('.img-upload__cancel');
const hashTagInputElement = formElement.querySelector('.text__hashtags');
const textAreaELement = formElement.querySelector('.text__description');

const removeFormEscKeydown = () => document.removeEventListener('keydown', formEscKeydownHandler);

const setFormEscKeydown = () => document.addEventListener('keydown', formEscKeydownHandler);

const resetForm = () => {
  fileUploadElement.value = '';
  hashTagInputElement.value = '';
  textAreaELement.value = '';
  pristine.reset();
};

const closeForm = () => {
  toggleClass(overlayElement, 'hidden');
  toggleClass(document.body, 'model-open');
  removeFormEscKeydown();
  resetForm();
};

const openForm = () => {
  toggleClass(overlayElement, 'hidden');
  toggleClass(document.body, 'model-open');
  setFormEscKeydown();
};

function formEscKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    closeForm();
  }
}

const setCloseButtonClick = () => {
  formCloseButtonElement.addEventListener('click', () => {
    closeForm();
  });
};

const setFileUploadChange = () => {
  fileUploadElement.addEventListener('change', () => {
    openForm();
  });
};

const setHashTagBlur = () => {
  hashTagInputElement.addEventListener('blur', (evt) => {
    evt.target.value = evt.target.value.trim();
    pristine.validate();
  });
};

const setFormEscdown = () => {
  formElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
};

const setFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      evt.target.submit();
      resetForm();
    }
  });
};

const setFormEventListeners = () => {
  setFileUploadChange();
  setCloseButtonClick();
  setFormEscdown();
  setFormSubmit();
  setHashTagBlur(pristine);
};

export { setFormEventListeners };
