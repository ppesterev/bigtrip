export default class OfferCollection {
  static toRemoteShape(collection) {
    return Object.entries(collection).map(([type, offers]) => ({
      type,
      offers
    }));
  }

  static toLocalShape(remoteOffers) {
    return remoteOffers.reduce(
      (acc, group) => ({
        ...acc,
        [group.type]: group.offers.slice()
      }),
      {}
    );
  }
}
