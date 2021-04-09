import { FilterOptions, SortOptions, Views } from "../const";

const initialState = {
  token: null,
  events: [],
  offers: {},
  destinations: [],

  editedEvent: null,

  view: Views.HOME,
  filter: FilterOptions.DEFAULT,
  sorting: SortOptions.DEFAULT
};

export default initialState;
