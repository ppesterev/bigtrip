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

export const TypeCategory = {
  TRANSPORT: "transport",
  ACTIVITY: "activity"
};

export const FilterOption = {
  DEFAULT: "default",
  PAST: "past",
  FUTURE: "future"
};

export const SortOption = {
  DEFAULT: "default",
  TIME: "time",
  PRICE: "price"
};

export const View = {
  HOME: "home",
  STATS: "stats"
};
