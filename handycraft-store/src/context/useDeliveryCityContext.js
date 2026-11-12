import { useContext } from 'react'
import { DeliveryCityContext } from './DeliveryCityContext'

export function useDeliveryCityContext() {
  const context = useContext(DeliveryCityContext)
  if (context === null) throw new Error('useDeliveryCityContext має викликатися всередині <DeliveryCityProvider>')
  return context
}
