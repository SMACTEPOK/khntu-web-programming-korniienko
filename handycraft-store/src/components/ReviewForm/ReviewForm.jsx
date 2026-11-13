import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '../../schemas/reviewSchema'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

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

      if (!response.ok) throw new Error(`Помилка сервера: статус ${response.status}`)

      setSubmitStatus('success')
      if (onReviewSubmit) onReviewSubmit(data)
      reset()
    } catch (err) {
      setSubmitStatus('error')
      setServerError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 bg-surface p-6 border-2 border-border mt-10 max-w-2xl w-full shadow-brutal">
      <h3 className="font-mono text-white uppercase tracking-widest m-0 mb-4">Залишити відгук</h3>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        <Input
          label="Ваше ім'я"
          error={errors.authorName?.message}
          {...register('authorName')}
        />
        <Input
          as="select"
          label="Оцінка"
          error={errors.rating?.message}
          defaultValue=""
          {...register('rating')}
        >
          <option value="" disabled>Оберіть оцінку</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Input>
      </div>

      <Input
        as="textarea"
        label="Текст відгуку"
        rows={4}
        error={errors.reviewText?.message}
        {...register('reviewText')}
      />

      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? 'Надсилання…' : 'Залишити відгук'}
      </Button>

      <div className="min-h-[40px]">
        {submitStatus === 'error' && (
          <p role="alert" className="p-3 bg-[#2a1111] border border-danger text-danger font-mono text-xs m-0">{serverError}</p>
        )}
        {isSubmitSuccessful && submitStatus === 'success' && (
          <p className="text-success font-mono text-xs m-0">Дякуємо за ваш відгук!</p>
        )}
      </div>
    </form>
  )
}

export default ReviewForm
