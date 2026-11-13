import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { X } from 'lucide-react'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { formatPrice } from '../../utils/formatPrice'
import { Button } from '../ui/Button'

const EXIT_DURATION_MS = 200

function getExitDelay() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : EXIT_DURATION_MS
}

export default function ProductModal({ product, onClose }) {
  const [isClosing, setIsClosing] = useState(false)
  const requestClose = useCallback(() => setIsClosing(true), [])
  useEscapeKey(requestClose)

  // Варіант 9: Блокування скролу при відкритті
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Варіант 9: Зняття блокування після анімації закриття
  useEffect(() => {
    if (!isClosing) return
    const timerId = setTimeout(() => {
      document.body.style.overflow = 'unset'
      onClose()
    }, getExitDelay())
    
    return () => {
      clearTimeout(timerId)
      document.body.style.overflow = 'unset' // Запобіжник при раптовому розмонтуванні
    }
  }, [isClosing, onClose])

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) requestClose()
  }

  return (
    <div
      role="presentation"
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4 ${
        isClosing ? 'animate-overlay-out' : 'animate-overlay-in'
      }`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className={`relative w-full max-w-lg bg-surface border-2 border-border shadow-brutal p-6 ${
          isClosing ? 'animate-modal-out' : 'animate-modal-in'
        }`}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Закрити"
          className="absolute right-4 top-4 text-muted hover:text-white transition-colors cursor-pointer"
        >
          <X aria-hidden="true" className="h-6 w-6" />
        </button>

        <h2 id="product-modal-title" className="pr-10 text-2xl font-bold text-white uppercase tracking-wider">
          {product.name}
        </h2>
        <p className="mt-2 font-mono text-xs text-muted uppercase tracking-wider">{product.category}</p>
        
        <img 
          src={product.image || '/src/assets/product-placeholder.svg'} 
          alt={product.name}
          className="mt-4 w-full h-64 object-cover border-2 border-border grayscale"
        />
        
        <p className="mt-6 text-3xl font-bold text-white font-mono">{formatPrice(product.price)}</p>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={requestClose}>Закрити</Button>
        </div>
      </div>
    </div>
  )
}

ProductModal.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}
