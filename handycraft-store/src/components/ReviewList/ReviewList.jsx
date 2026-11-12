import PropTypes from 'prop-types'

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) return null

  return (
    // Варіант 9: Обмеження максимальної ширини та центрування
    <div className="mt-12 w-full max-w-7xl mx-auto">
      <h3 className="font-mono text-xl text-white uppercase mb-6 border-b border-border pb-4">Відгуки покупців</h3>
      
      {/* Варіант 4: Адаптивна сітка відгуків (1 - 2 - 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="bg-surface border-2 border-border p-5 shadow-brutal">
            <div className="flex justify-between items-start mb-3">
              <span className="font-bold text-white font-mono text-sm uppercase">{r.authorName}</span>
              <span className="text-accent font-mono text-xs">{'★'.repeat(Number(r.rating))}</span>
            </div>
            <p className="text-muted text-sm font-mono leading-relaxed break-words">{r.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
}
