import { FilterOptions, SortOptions, Views } from "../const";

const initialState = {
  events: [],
  offers: [],
  destinations: [],

  view: Views.HOME,
  filter: FilterOptions.DEFAULT,
  sorting: SortOptions.DEFAULT,
  token: null
};

export default initialState;
