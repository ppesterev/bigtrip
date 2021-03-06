import PropTypes from "prop-types";

const offer = PropTypes.shape({
  type: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number
});

const destination = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      description: PropTypes.string
    })
  )
});

const event = PropTypes.shape({
  type: PropTypes.string,

  basePrice: PropTypes.number,
  dateFrom: PropTypes.instanceOf(Date),
  dateTo: PropTypes.instanceOf(Date),

  destination,
  offers: PropTypes.arrayOf(offer),

  isFavorite: PropTypes.bool
});

const shapes = {
  offer,
  destination,
  event
};

export default shapes;
