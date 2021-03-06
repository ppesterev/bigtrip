import React from "react";
import { FilterOptions } from "../const";

export default function FilterForm({ filteredBy, setFilteredBy }) {
  return (
    <form className="trip-filters" action="#" method="get">
      <div className="trip-filters__filter">
        <input
          id="filter-everything"
          className="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="everything"
          checked={filteredBy === FilterOptions.DEFAULT}
          onChange={() => setFilteredBy(FilterOptions.DEFAULT)}
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
          checked={filteredBy === FilterOptions.FUTURE}
          onChange={() => setFilteredBy(FilterOptions.FUTURE)}
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
          checked={filteredBy === FilterOptions.PAST}
          onChange={() => setFilteredBy(FilterOptions.PAST)}
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
