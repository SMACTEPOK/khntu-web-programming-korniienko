import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

const loginSchema = z.object({
  email: z.string().email('Введіть коректну адресу пошти'),
  password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
})

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const location = useLocation()
  const redirectTo = location.state?.from ?? '/orders'
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await login(values)
    } catch (error) {
      setServerError(
        error.status === 401
          ? error.message
          : 'Сервер недоступний. Спробуйте пізніше.',
      )
    }
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return (
    <main className="mx-auto max-w-sm w-full px-4 py-20">
      <h1 className="mb-8 text-3xl font-bold text-white uppercase border-b-2 border-border pb-4">Вхід</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 bg-surface p-6 border-2 border-border shadow-brutal">
        <Input
          label="Електронна пошта"
          type="email"
          autoComplete="username"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Пароль"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        {serverError && (
          <p role="alert" className="p-3 bg-[#2a1111] border border-danger text-danger font-mono text-xs m-0">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? 'Вхід…' : 'Увійти'}
        </Button>
      </form>
    </main>
  )
}
