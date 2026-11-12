import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '../../schemas/reviewSchema'

function ReviewForm({ onReviewSubmit }) {
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { authorName: '', rating: '', reviewText: '' },
  })

  const onSubmit = async (data) => {
    setSubmitStatus('loading')
    setServerError('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Помилка сервера: статус ${response.status}`)
      }

      setSubmitStatus('success')
      if (onReviewSubmit) onReviewSubmit(data)
      reset()
    } catch (err) {
      setSubmitStatus('error')
      setServerError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 bg-surface p-6 border-2 border-border mt-10 max-w-2xl w-full">
      <h3 className="font-mono text-white uppercase tracking-widest m-0 mb-4">Залишити відгук</h3>

      {/* Варіант 14: Поля в один рядок на md екранах */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="authorName" className="font-mono text-xs text-muted uppercase">Ваше ім'я</label>
          <input id="authorName" type="text" {...register('authorName')} className="p-3 bg-background border-2 border-border text-white font-mono text-sm outline-none focus:border-accent h-11" />
          {/* Варіант 14: Фіксована висота для запобігання зсуву верстки */}
          <div className="min-h-[20px]">
            {errors.authorName && <p role="alert" className="text-red-400 font-mono text-[11px] m-0">{errors.authorName.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rating" className="font-mono text-xs text-muted uppercase">Оцінка</label>
          <select id="rating" {...register('rating')} defaultValue="" className="p-3 bg-background border-2 border-border text-white font-mono text-sm outline-none focus:border-accent h-11">
            <option value="" disabled>Оберіть оцінку</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div className="min-h-[20px]">
            {errors.rating && <p role="alert" className="text-red-400 font-mono text-[11px] m-0">{errors.rating.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="reviewText" className="font-mono text-xs text-muted uppercase">Текст відгуку</label>
        <textarea id="reviewText" rows={4} {...register('reviewText')} className="p-3 bg-background border-2 border-border text-white font-mono text-sm outline-none focus:border-accent resize-y" />
        <div className="min-h-[20px]">
          {errors.reviewText && <p role="alert" className="text-red-400 font-mono text-[11px] m-0">{errors.reviewText.message}</p>}
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="p-3 bg-[#111] text-white border-2 border-accent font-mono text-sm uppercase cursor-pointer hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2 max-w-[200px]">
        {isSubmitting ? 'Надсилання…' : 'Залишити відгук'}
      </button>

      <div className="min-h-[40px]">
        {submitStatus === 'error' && (
          <p role="alert" className="p-3 bg-red-900/30 border border-red-900 text-red-400 font-mono text-xs m-0">{serverError}</p>
        )}
        {isSubmitSuccessful && submitStatus === 'success' && (
          <p className="text-green-500 font-mono text-xs m-0">Дякуємо за ваш відгук!</p>
        )}
      </div>
    </form>
  )
}

export default ReviewForm
