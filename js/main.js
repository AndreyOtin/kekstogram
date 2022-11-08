import { getData } from './api.js';
import { renderPictures, setPictureClick, pictureContainerElement } from './picture.js';
import { showBigPicture, setBigPictureEventListeners } from './big-picture.js';
import { findDataElementById } from './util.js';
import { setFormEventListeners, setInitialFormState } from './form.js';
import { showAlert } from './dom-util.js';

getData(
  (data) => {
    renderPictures(data);
    setBigPictureEventListeners();
    setInitialFormState();
    setFormEventListeners();
    setPictureClick((id) => {
      showBigPicture(findDataElementById(id, data));
    });
  },
  (error) => showAlert(error, pictureContainerElement)
);
