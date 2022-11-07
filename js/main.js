import { generateData } from './mock-data.js';
import { renderPictures, setPictureClick } from './picture.js';
import { showBigPicture, setBigPictureEventListeners } from './big-picture.js';
import { findDataElementById } from './util.js';
import { setFormEventListeners, setInitialFormValues } from './form.js';


const data = generateData();

renderPictures(data);
setBigPictureEventListeners();
setFormEventListeners();
setInitialFormValues();

setPictureClick((id) => {
  showBigPicture(findDataElementById(id, data));
});
