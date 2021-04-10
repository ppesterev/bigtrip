import dayjs from "dayjs";
import { types, TypeCategory } from "../const";
import { capitalize, getTypeCategory } from "../utils";

export default class TripEvent {
  static getSummary(event) {
    return `${capitalize(event.type)} \
${getTypeCategory(event.type) === TypeCategory.ACTIVITY ? "in" : "to"} \
${event.destination.name}`;
  }

  static getDuration(event) {
    if (!(event.dateTo instanceof Date) || !(event.dateFrom instanceof Date)) {
      return;
    }
    return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
  }

  static getFullPrice(event) {
    const { basePrice, offers } = event;
    return basePrice + offers.reduce((acc, offer) => acc + offer.price, 0);
  }

  static getBlankEvent() {
    return {
      type: types[0],
      basePrice: 0,
      dateFrom: null,
      dateTo: null,
      destination: null,
      offers: [],
      isFavorite: false
    };
  }

  static toRemoteShape(event) {
    const remoteEvent = {
      ["type"]: event.type,
      ["base_price"]: event.basePrice,
      ["date_from"]: event.dateFrom.toString(),
      ["date_to"]: event.dateTo.toString(),
      ["destination"]: event.destination,
      ["offers"]: event.offers,
      ["is_favorite"]: event.isFavorite
    };
    if (event.id) {
      remoteEvent["id"] = event.id;
    }
    return remoteEvent;
  }

  static toLocalShape(remoteEvent) {
    return {
      id: remoteEvent["id"],
      type: remoteEvent["type"],
      basePrice: remoteEvent["base_price"],
      dateFrom: new Date(remoteEvent["date_from"]),
      dateTo: new Date(remoteEvent["date_to"]),
      destination: remoteEvent["destination"],
      offers: remoteEvent["offers"],
      isFavorite: remoteEvent["is_favorite"]
    };
  }
}
