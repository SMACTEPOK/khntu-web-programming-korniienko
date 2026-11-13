export function getErrorMessage(error) {
  if (error?.status >= 500) return 'Сервер тимчасово недоступний. Повторіть запит за кілька секунд.'
  if (error?.status === 404) return 'Каталог не знайдено. Можливо, адресу змінено.'
  if (error?.status) return `Запит не виконано (код ${error.status}).`
  return "Не вдалося встановити з'єднання. Перевірте підключення до мережі."
}
