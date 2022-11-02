import { generateData } from './mock-data.js';
import { renderPictures, setPictureClick } from './picture.js';
import { showBigPicture } from './big-picture.js';
import { findDataElementById } from './util.js';


const data = generateData();
renderPictures(data);
setPictureClick((id) => {
  showBigPicture(findDataElementById(id, data));
});
