export class OfferCollection {
  constructor(offerGroups = []) {
    this._typeGroups = new Map();
    for (const group in offerGroups) {
      this._typeGroups.set(
        group.type,
        group.offers.map(({ title, price }) => ({
          title,
          price
        }))
      );
    }
  }

  getOffersOfType(type) {
    return this._typeGroups.get(type)?.slice() || [];
  }

  toRemoteShape() {
    return [...this._typeGroups.entries()].map(([type, offers]) => ({
      type,
      offers
    }));
  }

  static fromRemoteShape(remoteOffers) {
    return new OfferCollection(remoteOffers);
  }
}
