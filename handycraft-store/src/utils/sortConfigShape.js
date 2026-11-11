import PropTypes from 'prop-types'

export const sortConfigShape = PropTypes.shape({
  field: PropTypes.oneOf(['name', 'price', 'category']).isRequired,
  direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
})
