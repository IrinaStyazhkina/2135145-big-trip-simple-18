import {getDateWithSeparator, getDateWithTime, getMonthAndDay, getTime} from '../utils/time-formatter.js';
import AbstractView from '../framework/view/abstract-view.js';

const createOfferTemplate = (offer) => (
  `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`
);

const createOffersTemplate = (offers) => (
  `<ul class="event__selected-offers">
    ${offers.map((offer) => createOfferTemplate(offer)).join('')}
    </ul>`
);

const createEventsScheduleTemplate = (startDate, startTime, endDate, endTime) => (
  `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" dateTime="${startDate}">${startTime}</time>
      &mdash;
      <time class="event__end-time" dateTime="${endDate}">${endTime}</time>
    </p>
  </div>`
);

const createPriceTemplate = (price) => (
  `<p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
  `
);

const createPointItemTemplate = (point, destination) => {

  const {dateFrom, dateTo, basePrice} = point;
  const dayAndMonth = getMonthAndDay(dateFrom);
  const startTime = getTime(dateFrom);
  const endTime = getTime(dateTo);
  const dateWithSeparator = getDateWithSeparator(dateFrom);
  const startDate = getDateWithTime(dateFrom);
  const endDate = getDateWithTime(dateTo);
  const {name} = destination;

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${dateWithSeparator}>${dayAndMonth}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Flight ${name}</h3>
      ${createEventsScheduleTemplate(startDate, startTime, endDate, endTime)}
      ${createPriceTemplate(basePrice)}
      <h4 class="visually-hidden">Offers:</h4>
      ${createOffersTemplate(point.offers)}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
};

export default class PointItemView extends AbstractView{
  #point = null;
  #destination = null;

  constructor(point, destination) {
    super();
    this.#point = point;
    this.#destination = destination;
  }

  get template() {
    return createPointItemTemplate(this.#point, this.#destination);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
