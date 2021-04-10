import { FilterOption, SortOption, View } from "../const";

const initialState = {
  token: null,
  events: [],
  offers: {},
  destinations: [],

  editedEvent: null,

  view: View.HOME,
  filter: FilterOption.DEFAULT,
  sorting: SortOption.DEFAULT
};

export default initialState;
