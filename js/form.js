import { toggleClass, isEscapeKey, toggleDisabledState } from './dom-util.js';
import { pristine } from './pristine-setup.js';
import { setScaleControlClick, resetScaleControl } from './scale.js';
import { setEffectsChange, applyFilterStyle, clearFilterStyle } from './filters.js';
import { setSliderSlide, hideSlider, createSlider, resetSlider } from './slider.js';
import { sendData } from './api.js';
import { showModal } from './send-modal.js';

const formElement = document.querySelector('.img-upload__form');
const fileUploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const formCloseButtonElement = formElement.querySelector('.img-upload__cancel');
const hashTagInputElement = formElement.querySelector('.text__hashtags');
const imgPreviewElement = formElement.querySelector('.img-upload__preview img');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

let currentFilterClass;

const removeFormEscKeydown = () => document.removeEventListener('keydown', formEscKeydownHandler);

const setFormEscKeydown = () => document.addEventListener('keydown', formEscKeydownHandler);

const closeForm = () => {
  toggleClass(overlayElement, 'hidden');
  toggleClass(document.body, 'model-open');
};

const openForm = () => {
  toggleClass(overlayElement, 'hidden');
  toggleClass(document.body, 'model-open');

};

function formEscKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    formCloseButtonElement.click();
  }
}

const changePreviewClass = (effectType) => {
  imgPreviewElement.classList.remove(currentFilterClass);
  currentFilterClass = `effects__preview--${effectType}`;
  imgPreviewElement.classList.add(currentFilterClass);
};

const setCloseButtonClick = () => {
  formCloseButtonElement.addEventListener('click', (evt) => {
    evt.stopPropagation();

    closeForm();
    removeFormEscKeydown();
    pristine.reset();
    resetScaleControl();
    resetSlider();
    clearFilterStyle();
    changePreviewClass('none');
  });
};

const setFileUploadChange = () => {
  fileUploadElement.addEventListener('change', () => {
    openForm();
    setFormEscKeydown();
    resetScaleControl();
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
    if (isEscapeKey(evt) &&
      evt.target.className === 'text__description' ||
      evt.target.className === 'text__hashtags') {
      evt.stopPropagation();
    }
  });
};

const setFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      toggleDisabledState(submitButtonElement);
      sendData(
        () => {
          showModal('success');
          toggleDisabledState(submitButtonElement);
          formCloseButtonElement.click();
        },
        () => {
          showModal('error');
          toggleDisabledState(submitButtonElement);
        },
        new FormData(evt.target)
      );
    }
  });
};

const setFormEventListeners = () => {
  setFileUploadChange();
  setCloseButtonClick();
  setFormEscdown();
  setFormSubmit();
  setHashTagBlur(pristine);
  setScaleControlClick();
  setEffectsChange(changePreviewClass);
  setSliderSlide(applyFilterStyle);
};

const setInitialFormState = () => {
  resetScaleControl();
  createSlider();
  hideSlider();
};

export { setFormEventListeners, setInitialFormState };
