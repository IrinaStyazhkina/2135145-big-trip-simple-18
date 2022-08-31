import PointListView from '../view/point-list-view.js';
import {render} from '../render.js';
import EditFormView from '../view/edit-form-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';

export default class TripPresenter {
  pointListView = new PointListView();

  init = (contentContainer) => {
    this.contentContainer = contentContainer;

    render(new SortView(), this.contentContainer);

    render(new EditFormView(), this.pointListView.getElement());

    for (let i = 0; i < 3; i += 1) {
      render(new PointItemView(), this.pointListView.getElement());
    }
    render(this.pointListView, this.contentContainer);
  };
}
