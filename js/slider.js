const sliderElement = document.querySelector('.effect-level__slider');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    connect: true,
    format: {
      to(value) {
        return value.toFixed(1);
      },
      from(value) {
        return +value;
      }
    },
    start: 1,
    range: {
      min: 0,
      max: 1
    },
    step: 0.1
  });
};

const showSlider = () => sliderElement.classList.remove('hidden');

const hideSlider = () => sliderElement.classList.add('hidden');

const updateSlider = (options) => {
  if (!options) {
    return;
  }

  const { min, max, step } = options;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max
    },
    step,
    start: max
  });
};

const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    start: 1
  });
};

const setSliderSlide = (cb) => {
  sliderElement.noUiSlider.on('slide', (evt) => {
    cb(evt[0]);
  });
};

export { updateSlider, createSlider, setSliderSlide, showSlider, hideSlider, resetSlider };
