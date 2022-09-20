import PointListView from '../view/point-list-view.js';
import {render} from '../render.js';
import EditFormView from '../view/edit-form-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';

export default class TripPresenter {
  pointListView = new PointListView();

  init = (contentContainer, pointsModel, destinationsModel) => {
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.points = [...this.pointsModel.getPoints()];

    render(new SortView(), this.contentContainer);

    render(new EditFormView(this.points[0], this.destinationsModel.getDestinations(), this.destinationsModel.getDestinationById(this.points[0].destination) ), this.pointListView.getElement());

    for (let i = 0; i < this.points.length; i += 1) {
      render(new PointItemView(this.points[i], this.destinationsModel.getDestinationById(this.points[i].destination)), this.pointListView.getElement());
    }
    render(this.pointListView, this.contentContainer);
  };
}
