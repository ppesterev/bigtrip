import { nanoid } from "nanoid";

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
  return request(`${BASE_URL}points`, authToken, Methods.GET).then((res) =>
    res.json()
  );
}

export function createEvent(event, authToken) {
  return request(
    `${BASE_URL}points`,
    authToken,
    Methods.POST,
    JSON.stringify(event)
  ).then((res) => res.json());
}

export function updateEvent(id, event, authToken) {
  return request(
    `${BASE_URL}points/${id}`,
    authToken,
    Methods.PUT,
    JSON.stringify(event)
  ).then((res) => res.json());
}

export function deleteEvent(id, authToken) {
  return request(`${BASE_URL}points/${id}`, authToken, Methods.DELETE);
}

export function getDestinations(authToken) {
  return request(`${BASE_URL}destinations`, authToken).then((res) =>
    res.json()
  );
}

export function getOffers(authToken) {
  return request(`${BASE_URL}offers`, authToken).then((res) => res.json());
}

export function sync(localEvents, authToken) {
  return request(
    `${BASE_URL}points/sync`,
    authToken,
    Methods.POST,
    JSON.stringify(localEvents)
  )
    .then((res) => res.json())
    .then((syncData) => [
      ...syncData.created,
      ...syncData.updated
        //.filter((update) => update.success)
        .map((update) => update.payload.point)
    ]);
}
