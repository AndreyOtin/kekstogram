import { getData } from './api.js';
import { renderPictures, setPictureClick, pictureContainerElement } from './picture.js';
import { showBigPicture, setBigPictureEventListeners } from './big-picture.js';
import { findDataElementById, debounce } from './util.js';
import { setFormEventListeners, setInitialFormState } from './form.js';
import { showAlert } from './dom-util.js';
import { showFilters, setFilterClick } from './filter.js';

const DEBOUNCE_DELAY = 500;

getData(
  (data) => {
    renderPictures(data);
    showFilters();
    setFilterClick(data, debounce(renderPictures, DEBOUNCE_DELAY ));
    setBigPictureEventListeners();
    setInitialFormState();
    setFormEventListeners();
    setPictureClick((id) => {
      showBigPicture(findDataElementById(id, data));
    });
  },
  (error) => {
    showAlert(error, pictureContainerElement);
  }
);
