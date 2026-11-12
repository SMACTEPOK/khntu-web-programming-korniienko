import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '../../schemas/reviewSchema'
import './ReviewForm.css'

function ReviewForm({ onReviewSubmit }) {
  const [submitStatus, setSubmitStatus] = useState('idle') // idle, loading, success, error
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="review-form">
      <h3 className="review-form__title">Залишити відгук</h3>

      <div className="review-form__group">
        <label htmlFor="authorName" className="review-form__label">Ваше ім'я</label>
        <input id="authorName" type="text" {...register('authorName')} className="review-form__input" />
        {errors.authorName && <p role="alert" className="review-form__error">{errors.authorName.message}</p>}
      </div>

      <div className="review-form__group">
        <label htmlFor="rating" className="review-form__label">Оцінка</label>
        <select id="rating" {...register('rating')} defaultValue="" className="review-form__select">
          <option value="" disabled>Оберіть оцінку</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.rating && <p role="alert" className="review-form__error">{errors.rating.message}</p>}
      </div>

      <div className="review-form__group">
        <label htmlFor="reviewText" className="review-form__label">Текст відгуку</label>
        <textarea id="reviewText" rows={4} {...register('reviewText')} className="review-form__textarea" />
        {errors.reviewText && <p role="alert" className="review-form__error">{errors.reviewText.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="review-form__submit">
        {isSubmitting ? 'Надсилання…' : 'Залишити відгук'}
      </button>

      {/* Варіант 14: Відображення трьох станів сабміту */}
      {submitStatus === 'error' && (
        <p role="alert" className="review-form__error review-form__error--server">
          {serverError}
        </p>
      )}
      {isSubmitSuccessful && submitStatus === 'success' && (
        <p className="review-form__success">Дякуємо за ваш відгук!</p>
      )}
    </form>
  )
}

export default ReviewForm
