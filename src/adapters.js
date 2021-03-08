export const eventAdapter = {
  localToRemote: (localEvent) => {
    const remoteEvent = {
      type: localEvent.type,
      base_price: localEvent.basePrice,
      date_from: localEvent.dateFrom.toString(),
      date_to: localEvent.dateTo.toString(),
      destination: destinationAdapter.localToRemote(localEvent.destination),
      offers: localEvent.offers.map(offerAdapter.localToRemote),
      is_favorite: localEvent.isFavorite
    };
    if (localEvent.id) {
      remoteEvent.id = localEvent.id;
    }
    return remoteEvent;
  },

  remoteToLocal: (remoteEvent) => {
    return {
      id: remoteEvent["id"],
      type: remoteEvent["type"],
      basePrice: remoteEvent["base_price"],
      dateFrom: new Date(remoteEvent["date_from"]),
      dateTo: new Date(remoteEvent["date_to"]),
      destination: destinationAdapter.remoteToLocal(remoteEvent["destination"]),
      offers: remoteEvent["offers"].map(offerAdapter.remoteToLocal),
      isFavorite: remoteEvent["is_favorite"]
    };
  }
};

export const destinationAdapter = {
  localToRemote: (dest) => dest,
  remoteToLocal: (dest) => dest
};

export const offerAdapter = {
  localToRemote: (offer) => offer,
  remoteToLocal: (offer) => offer
};
