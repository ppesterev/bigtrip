import { nanoid } from "nanoid";
import { destinationAdapter, eventAdapter, offerAdapter } from "./adapters";

const BASE_URL = "https://11.ecmascript.pages.academy/big-trip/";

const Methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

function request(url, authToken, method = Methods.GET, payload = null) {
  const options = { method, headers: { Authorization: authToken } };
  if (payload && method !== "GET") {
    options.body = payload;
    options.headers["Content-Type"] = "application/json;charset=utf-8";
  }
  return fetch(url, options).then((res) =>
    res.ok ? Promise.resolve(res) : Promise.reject(res.status)
  );
}

export function getToken() {
  let token = localStorage.getItem("authToken");
  if (!token) {
    token = `Basic ${nanoid()}`;
    localStorage.setItem("authToken", token);
  }
  return token;
}

export function getEvents(authToken) {
  return request(`${BASE_URL}points`, authToken, Methods.GET)
    .then((res) => res.json())
    .then((remoteEvents) => remoteEvents.map(eventAdapter.remoteToLocal));
}

export function createEvent(event, authToken) {
  return request(
    `${BASE_URL}points`,
    authToken,
    Methods.POST,
    JSON.stringify(eventAdapter.localToRemote(event))
  )
    .then((res) => res.json())
    .then((remoteEvent) => eventAdapter.remoteToLocal(remoteEvent));
}

export function updateEvent(id, event, authToken) {
  return request(
    `${BASE_URL}points/${id}`,
    authToken,
    Methods.PUT,
    JSON.stringify(eventAdapter.localToRemote(event))
  )
    .then((res) => res.json())
    .then((remoteEvent) => eventAdapter.remoteToLocal(remoteEvent));
}

export function deleteEvent(id, authToken) {
  return request(`${BASE_URL}points/${id}`, authToken, Methods.DELETE);
}

export function getDestinations(authToken) {
  return request(`${BASE_URL}destinations`, authToken)
    .then((res) => res.json())
    .then((remoteDestinations) =>
      destinationAdapter.remoteToLocal(remoteDestinations)
    );
}

export function getOffers(authToken) {
  return request(`${BASE_URL}offers`, authToken)
    .then((res) => res.json())
    .then((remoteOffers) => offerAdapter.remoteToLocal(remoteOffers));
}
