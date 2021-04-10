import PropTypes from "prop-types";
import React from "react";

import { SortOption } from "../const";
import { setSorting } from "../store/actions";

function SortForm({ sorting, dispatch }) {
  const onSortingSelected = (newSorting) => {
    if (sorting === newSorting) {
      return;
    }
    dispatch(setSorting(newSorting));
  };

  const SortSelector = (value, text) => {
    const attributeText = text.toLowerCase();
    return (
      <div
        className={`trip-sort__item  trip-sort__item--${attributeText}`}
        key={value}
      >
        <input
          id={`sort-${attributeText}`}
          className="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value={`sort-${attributeText}`}
          checked={sorting === value}
          onChange={() => onSortingSelected(value)}
        />
        <label className="trip-sort__btn" htmlFor={`sort-${attributeText}`}>
          {text}
        </label>
      </div>
    );
  };

  return (
    <form className="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span className="trip-sort__item  trip-sort__item--day"></span>

      {SortSelector(SortOption.DEFAULT, "Event")}
      {SortSelector(SortOption.TIME, "Time")}
      {SortSelector(SortOption.PRICE, "Price")}

      <span className="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  );
}

SortForm.propTypes = {
  sorting: PropTypes.oneOf(Object.values(SortOption)),
  dispatch: PropTypes.func
};

export default SortForm;
