import PointListView from '../view/point-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import {render, replace} from '../framework/render.js';

export default class TripPresenter {
  #pointListView = new PointListView();
  #contentContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #points = null;

  constructor(contentContainer, pointsModel, destinationsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
  }

  init = () => {
    render(new SortView(), this.#contentContainer);
    this.#points = [...this.#pointsModel.points];
    this.#renderPointList();
  };

  #renderPointItem = (point) => {
    const pointItemView = new PointItemView(point, this.#destinationsModel.getDestinationById(point.destination));
    const editFormView = new EditFormView(point, this.#destinationsModel.destinations, this.#destinationsModel.getDestinationById(point.destination));

    const replacePointViewToForm = () => {
      replace(editFormView, pointItemView);
    };

    const replaceFormToPointView = () => {
      replace(pointItemView, editFormView);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPointView();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointItemView.setEditClickHandler(() => {
      replacePointViewToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormView.setFormSubmitHandler(() => {
      replaceFormToPointView();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormView.setCloseClickHandler(() => {
      replaceFormToPointView();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointItemView, this.#pointListView.element);
  };

  #renderPointList = () => {
    if (this.#points === null || this.#points.length === 0) {
      render(new NoPointView(), this.#contentContainer);
    } else {
      for (let i = 0; i < this.#points.length; i += 1) {
        this.#renderPointItem(this.#points[i]);
      }
      render(this.#pointListView, this.#contentContainer);
    }
  };
}
