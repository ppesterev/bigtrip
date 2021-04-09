import dayjs, { duration } from "dayjs";
import { types, TypeCategories } from "../const";
import { capitalize, getTypeCategory } from "../utils";

dayjs.extend(duration);

export default class TripEvent {
  constructor({
    type = types[0],
    basePrice = 0,
    dateFrom = null,
    dateTo = null,
    destination = null,
    offers = [],
    isFavorite = false
  }) {
    this.type = type;
    this.basePrice = basePrice;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;

    this.destination = destination;
    this.offers = offers;

    this.isFavorite = isFavorite;
  }

  getSummary() {
    return `${capitalize(this.type)} \
${getTypeCategory(this.type) === TypeCategories.ACTIVITY ? "in" : "to"} \
${this.destination.name}`;
  }

  getDuration() {
    if (!(this.dateTo instanceof Date) || !(this.dateFrom instanceof Date)) {
      return;
    }

    return dayjs.dura;
  }

  getFullPrice() {}

  toRemoteShape() {
    const remoteEvent = {
      ["type"]: this.type,
      ["base_price"]: this.basePrice,
      ["date_from"]: this.dateFrom.toString(),
      ["date_to"]: this.dateTo.toString(),
      ["destination"]: this.destination,
      ["offers"]: this.offers,
      ["is_favorite"]: this.isFavorite
    };
    if (this.id) {
      remoteEvent["id"] = this.id;
    }
    return remoteEvent;
  }

  static fromRemoteShape(remoteEvent) {
    return new TripEvent({
      id: remoteEvent["id"],
      type: remoteEvent["type"],
      basePrice: remoteEvent["base_price"],
      dateFrom: new Date(remoteEvent["date_from"]),
      dateTo: new Date(remoteEvent["date_to"]),
      destination: remoteEvent["destination"],
      offers: remoteEvent["offers"],
      isFavorite: remoteEvent["is_favorite"]
    });
  }
}
