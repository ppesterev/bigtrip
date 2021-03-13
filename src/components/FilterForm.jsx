import React from "react";
import PropTypes from "prop-types";

import { FilterOptions } from "../const";
import { setFilter } from "../store/operations";
import { capitalize } from "../utils";

function FilterForm({ filter, dispatch }) {
  const onFilterSelected = (newFilter) => {
    if (filter === newFilter) {
      return;
    }
    dispatch(setFilter(newFilter));
  };

  const options = [
    { value: FilterOptions.DEFAULT, text: "everything" },
    { value: FilterOptions.FUTURE, text: "future" },
    { value: FilterOptions.PAST, text: "past" }
  ];

  return (
    <form className="trip-filters" action="#" method="get">
      {options.map((option) => (
        <div className="trip-filters__filter" key={option.value}>
          <input
            id={`filter-${option.text}`}
            className="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value={option.text}
            checked={filter === option.value}
            onChange={() => onFilterSelected(option.value)}
          />
          <label
            className="trip-filters__filter-label"
            htmlFor={`filter-${option.text}`}
          >
            {capitalize(option.text)}
          </label>
        </div>
      ))}

      <button className="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>
  );
}

FilterForm.propTypes = {
  filter: PropTypes.oneOf(Object.values(FilterOptions)),
  dispatch: PropTypes.func
};

export default FilterForm;
