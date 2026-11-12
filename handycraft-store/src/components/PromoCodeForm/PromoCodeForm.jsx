import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { promoCodeSchema } from '../../schemas/promoCodeSchema'
import './PromoCodeForm.css'

function PromoCodeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: { promoCode: '' },
  })

  const onSubmit = (data) => {
    alert(`Промокод ${data.promoCode} успішно застосовано!`)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="promo-form">
      <h3 className="promo-form__title">Промокод</h3>
      <div className="promo-form__group">
        <input
          type="text"
          placeholder="Введіть промокод..."
          {...register('promoCode')}
          className="promo-form__input"
        />
        <button type="submit" className="promo-form__submit">Застосувати</button>
      </div>
      {errors.promoCode && <p role="alert" className="promo-form__error">{errors.promoCode.message}</p>}
      {isSubmitSuccessful && <p className="promo-form__success">Промокод прийнято!</p>}
    </form>
  )
}

export default PromoCodeForm
