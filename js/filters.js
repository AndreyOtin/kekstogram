import { updateSlider, showSlider, hideSlider } from './slider.js';

const effectsContainerElement = document.querySelector('.effects__list');
const effectInputElement = document.querySelector('.effect-level__value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

let currentFilterType;

const typeToSetup = {
  chrome: {
    min: 0,
    max: 1,
    filter: 'grayscale',
    step: 0.1,
    postfix: ''
  },
  sepia: {
    min: 0,
    max: 1,
    filter: 'sepia',
    step: 0.1,
    postfix: ''
  },
  marvin: {
    min: 0,
    max: 100,
    filter: 'invert',
    step: 1,
    postfix: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    filter: 'blur',
    step: 0.1,
    postfix: 'px'
  },
  heat: {
    min: 1,
    max: 3,
    filter: 'brightness',
    step: 0.1,
    postfix: ''
  }
};

const applyFilterStyle = (value) => {
  imgPreviewElement.style.filter = `
  ${typeToSetup[currentFilterType].filter}(${value}${typeToSetup[currentFilterType].postfix})
  `;
  effectInputElement.value = value;
};

const clearFilterStyle = () => {
  imgPreviewElement.style.filter = '';
};

const setEffectsChange = (cb) => {
  effectsContainerElement.addEventListener('change', (evt) => {
    if (!typeToSetup[evt.target.value]) {
      hideSlider();
      clearFilterStyle();
      cb('none');
      return;
    }

    currentFilterType = evt.target.value;
    showSlider();
    updateSlider(typeToSetup[currentFilterType]);
    applyFilterStyle(typeToSetup[currentFilterType].max);
    cb(currentFilterType);
  });
};

export { setEffectsChange, applyFilterStyle, clearFilterStyle };
