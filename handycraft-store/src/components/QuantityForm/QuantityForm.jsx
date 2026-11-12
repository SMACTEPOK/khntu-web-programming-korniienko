import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quantitySchema } from '../../schemas/quantitySchema'
import './QuantityForm.css'

function QuantityForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(quantitySchema),
    defaultValues: { quantity: 1 },
  })

  const onSubmit = (data) => {
    console.log('Кількість збережено:', data.quantity)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="quantity-form">
      <h3 className="quantity-form__title">Кількість</h3>
      <div className="quantity-form__group">
        <input
          type="number"
          step="any"
          {...register('quantity')}
          className="quantity-form__input"
        />
        <button type="submit" className="quantity-form__submit">Додати</button>
      </div>
      {errors.quantity && <p role="alert" className="quantity-form__error">{errors.quantity.message}</p>}
      {isSubmitSuccessful && <p className="quantity-form__success">Успішно додано!</p>}
    </form>
  )
}

export default QuantityForm
