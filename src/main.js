import {render} from './render.js';
import FiltersView from './view/filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter();

render(new FiltersView(), filtersContainer);

tripPresenter.init(tripContainer);

