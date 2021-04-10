import { API_BASE_URL, HTTPMethod } from "../const";

export default class NetworkAPI {
  constructor(baseUrl = API_BASE_URL, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  setToken(token) {
    this._token = token;
  }

  getEvents() {
    return this._request(`points`, HTTPMethod.GET).then((res) => res.json());
  }

  getOffers() {
    return this._request(`offers`, HTTPMethod.GET).then((res) => res.json());
  }

  getDestinations() {
    return this._request(`destinations`, HTTPMethod.GET).then((res) =>
      res.json()
    );
  }

  createEvent(eventData) {
    return this._request(
      `points`,
      HTTPMethod.POST,
      JSON.stringify(eventData)
    ).then((res) => res.json());
  }

  updateEvent(id, eventData) {
    return this._request(
      `points/${id}`,
      HTTPMethod.PUT,
      JSON.stringify(eventData)
    ).then((res) => res.json());
  }

  deleteEvent(id) {
    return this._request(`points/${id}`, HTTPMethod.DELETE);
  }

  sync(localEventsData) {
    return this._request(
      `points/sync`,
      HTTPMethod.POST,
      JSON.stringify(localEventsData)
    )
      .then((res) => res.json())
      .then((syncData) => [
        ...syncData.created,
        ...syncData.updated.map((update) => update.payload.point)
      ]);
  }

  _request(endpoint, method = HTTPMethod.GET, payload = null) {
    const options = { method, headers: { Authorization: this._token } };
    if (payload && method !== HTTPMethod.GET) {
      options.body = payload;
      options.headers["Content-Type"] = "application/json;charset=utf-8";
    }
    return fetch(this._baseUrl + endpoint, options).then((res) =>
      res.ok ? Promise.resolve(res) : Promise.reject(res.status)
    );
  }
}
