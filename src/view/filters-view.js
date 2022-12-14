import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio"
             name="trip-filter" value="everything">
        <label class="trip-filters__filter-label" htmlFor="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
             value="future">
        <label class="trip-filters__filter-label" htmlFor="filter-future">Future</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FiltersView extends AbstractView{
  get template() {
    return createFiltersTemplate();
  }
}
