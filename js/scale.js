const scaleControlContainerElement = document.querySelector('.img-upload__scale');
const scaleValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

const STEP = 25;
const MIN = 25;
const MAX = 100;
const DEFAULT_VALUE = 100;

const getScaleNumber = (value) => +value.replace('%', '');

const applyScaleStyle = (number) => {
  imgPreviewElement.style.scale = number / 100;
};

const setScaleValueToInput = (number) => {
  scaleValueElement.value = `${number}%`;
};

const setScaleControlClick = () => {
  scaleControlContainerElement.addEventListener('click', (evt) => {
    evt.stopPropagation();
    let scaleNumber = getScaleNumber(scaleValueElement.value);

    if (evt.target.matches('.scale__control--smaller')) {
      scaleNumber = scaleNumber - STEP < MIN ? MIN : scaleNumber - STEP;
    }
    if (evt.target.matches('.scale__control--bigger')) {
      scaleNumber = scaleNumber + STEP > MAX ? MAX : scaleNumber + STEP;
    }

    setScaleValueToInput(scaleNumber);
    applyScaleStyle(scaleNumber);
  });
};

const resetScaleControl = () => {
  applyScaleStyle(DEFAULT_VALUE);
  setScaleValueToInput(DEFAULT_VALUE);
};


export { setScaleControlClick, resetScaleControl };
