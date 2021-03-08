import React from "react";
import PropTypes from "prop-types";

import { FilterOptions } from "../const";

function FilterForm({ activeFilter, onFilterSelected }) {
  return (
    <form className="trip-filters" action="#" method="get">
      <div className="trip-filters__filter">
        <input
          id="filter-everything"
          className="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="everything"
          checked={activeFilter === FilterOptions.DEFAULT}
          onChange={() => onFilterSelected(FilterOptions.DEFAULT)}
        />
        <label
          className="trip-filters__filter-label"
          htmlFor="filter-everything"
        >
          Everything
        </label>
      </div>

      <div className="trip-filters__filter">
        <input
          id="filter-future"
          className="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="future"
          checked={activeFilter === FilterOptions.FUTURE}
          onChange={() => onFilterSelected(FilterOptions.FUTURE)}
        />
        <label className="trip-filters__filter-label" htmlFor="filter-future">
          Future
        </label>
      </div>

      <div className="trip-filters__filter">
        <input
          id="filter-past"
          className="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="past"
          checked={activeFilter === FilterOptions.PAST}
          onChange={() => onFilterSelected(FilterOptions.PAST)}
        />
        <label className="trip-filters__filter-label" htmlFor="filter-past">
          Past
        </label>
      </div>

      <button className="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>
  );
}

FilterForm.propTypes = {
  activeFilter: PropTypes.oneOf(Object.values(FilterOptions)),
  onFilterSelected: PropTypes.func
};

export default FilterForm;
