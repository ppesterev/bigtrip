export const STORAGE_NAMESPACE = "bigtrip";

export const API_BASE_URL = "https://11.ecmascript.pages.academy/big-trip/";

export const HTTPMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

export const types = [
  "taxi",
  "bus",
  "train",
  "ship",
  "transport",
  "drive",
  "flight",
  "check-in",
  "sightseeing",
  "restaurant"
];

export const TypeCategories = {
  TRANSPORT: "transport",
  ACTIVITY: "activity"
};

export const FilterOptions = {
  DEFAULT: "default",
  PAST: "past",
  FUTURE: "future"
};

export const SortOptions = {
  DEFAULT: "default",
  TIME: "time",
  PRICE: "price"
};

export const Views = {
  HOME: "home",
  STATS: "stats"
};
