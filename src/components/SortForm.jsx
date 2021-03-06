import PropTypes from "prop-types";
import React from "react";

import { SortOptions } from "../const";

function SortForm({ sortedBy, onSort }) {
  const onSortClicked = (newSortOption) => {
    if (sortedBy === newSortOption) {
      return;
    }
    onSort(newSortOption);
  };

  return (
    <form className="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span className="trip-sort__item  trip-sort__item--day"></span>

      <div className="trip-sort__item  trip-sort__item--event">
        <input
          id="sort-event"
          className="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-event"
          checked={sortedBy === SortOptions.DEFAULT}
          onChange={(evt) =>
            evt.target.checked && onSortClicked(SortOptions.DEFAULT)
          }
        />
        <label className="trip-sort__btn" htmlFor="sort-event">
          Event
        </label>
      </div>

      <div className="trip-sort__item  trip-sort__item--time">
        <input
          id="sort-time"
          className="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-time"
          checked={sortedBy === SortOptions.TIME}
          onChange={(evt) =>
            evt.target.checked && onSortClicked(SortOptions.TIME)
          }
        />
        <label
          className="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase"
          htmlFor="sort-time"
        >
          Time
        </label>
      </div>

      <div className="trip-sort__item  trip-sort__item--price">
        <input
          id="sort-price"
          className="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-price"
          checked={sortedBy === SortOptions.PRICE}
          onChange={(evt) =>
            evt.target.checked && onSortClicked(SortOptions.PRICE)
          }
        />
        <label className="trip-sort__btn" htmlFor="sort-price">
          Price
        </label>
      </div>

      <span className="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  );
}

SortForm.propTypes = {
  sortedBy: PropTypes.oneOf(Object.values(SortOptions)),
  onSort: PropTypes.func
};

export default SortForm;
