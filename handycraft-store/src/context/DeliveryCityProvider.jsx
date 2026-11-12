import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DeliveryCityContext } from './DeliveryCityContext'
import { CITIES } from './cities'

export function DeliveryCityProvider({ children }) {
  const [city, setCity] = useState(CITIES[0])

  const value = useMemo(() => ({ city, setCity, cities: CITIES }), [city])

  return <DeliveryCityContext value={value}>{children}</DeliveryCityContext>
}

DeliveryCityProvider.propTypes = { children: PropTypes.node.isRequired }
