import React from "react";
import PropTypes from "prop-types";

import { FilterOptions } from "../const";
import { setFilter } from "../store/operations";

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
      {FilterSelector(FilterOptions.DEFAULT, "Everything")}
      {FilterSelector(FilterOptions.FUTURE, "Future")}
      {FilterSelector(FilterOptions.PAST, "Past")}

      <button className="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>
  );
}

FilterForm.propTypes = {
  filteredEvents: PropTypes.shape({
    [FilterOptions.DEFAULT]: PropTypes.array,
    [FilterOptions.FUTURE]: PropTypes.array,
    [FilterOptions.PAST]: PropTypes.array
  }),
  filter: PropTypes.oneOf(Object.values(FilterOptions)),
  dispatch: PropTypes.func
};

export default FilterForm;
