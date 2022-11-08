
import { createRandomElementsArray } from './util.js';

const filtersContainerElement = document.querySelector('.img-filters');

const showFilters = () => filtersContainerElement.classList.remove('img-filters--inactive');

const sortDataByPopularComments = (dataElement1, dataElement2) => dataElement2.comments.length - dataElement1.comments.length;

const getMostDiscussed = ([...data]) => data.sort(sortDataByPopularComments);

const setFilterClick = (data, cb) => {
  filtersContainerElement.addEventListener('click', (evt) => {
    evt.stopPropagation();

    switch (evt.target.id) {
      case 'filter-discussed':
        cb(getMostDiscussed(data));
        break;

      case 'filter-random':
        cb(createRandomElementsArray(data, 10));
        break;

      default:
        cb(data);
    }
  });
};

export { showFilters, setFilterClick };
