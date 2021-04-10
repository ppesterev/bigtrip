import React from "react";
import PropTypes from "prop-types";

import { FilterOption } from "../const";
import { setFilter } from "../store/actions";

function FilterForm({ filteredEvents, filter, dispatch }) {
  const onFilterSelected = (newFilter) => {
    if (filter === newFilter) {
      return;
    }
    dispatch(setFilter(newFilter));
  };

  const FilterSelector = (value, text) => {
    const attributeText = text.toLowerCase();
    return (
      <div className="trip-filters__filter">
        <input
          id={`filter-${attributeText}`}
          className="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value={attributeText}
          checked={filter === value}
          onChange={() => onFilterSelected(value)}
          disabled={!(filteredEvents[value]?.length != 0)}
        />
        <label
          className="trip-filters__filter-label"
          htmlFor={`filter-${attributeText}`}
        >
          {text}
        </label>
      </div>
    );
  };

  return (
    <form className="trip-filters" action="#" method="get">
      {FilterSelector(FilterOption.DEFAULT, "Everything")}
      {FilterSelector(FilterOption.FUTURE, "Future")}
      {FilterSelector(FilterOption.PAST, "Past")}

      <button className="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>
  );
}

FilterForm.propTypes = {
  filteredEvents: PropTypes.shape({
    [FilterOption.DEFAULT]: PropTypes.array,
    [FilterOption.FUTURE]: PropTypes.array,
    [FilterOption.PAST]: PropTypes.array
  }),
  filter: PropTypes.oneOf(Object.values(FilterOption)),
  dispatch: PropTypes.func
};

export default FilterForm;
