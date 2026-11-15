# ESTATE Platform

Курсова робота з дисципліни **«Веб-дизайн та веб-програмування»**.
Платформа нерухомості з інтерактивним каталогом, 360° турами, іпотечним калькулятором, аналітикою ринку та 3D-планувальником інтер'єру.

## 🛠 Технологічний стек

**Frontend:**
*   React 19 (Hooks, Context, `useReducer`, `useMemo`, `useCallback`)
*   React Router 7 (Lazy loading, Error Boundaries, Protected routes)
*   Vite (Build tool, Proxy)
*   Three.js + React Three Fiber (3D-планувальник)
*   Pannellum (360° віртуальні тури)
*   Recharts (Графіки аналітики)
*   CSS (Design Tokens, BEM, адаптивна верстка)

**Backend (Local Mock Server):**
*   Node.js + Express
*   JSON Web Tokens (JWT) для авторизації
*   Bcrypt.js для хешування паролів

**Тестування та якість:**
*   Vitest + React Testing Library
*   ESLint + Prettier

## 🚀 Як запустити проєкт

1. Встановіть залежності:
   ```bash
   npm install
Запустіть фронтенд та бекенд одночасно:

bash
npm start
Фронтенд: http://localhost:5173

Бекенд (API): http://localhost:8080

Демо-акаунт для входу:

Email: anna@estate.dev

Пароль: craft2026

Запуск тестів:

bash
npm run test
Перевірка лінтером:

bash
npm run lint
📁 Структура проєкту
Проєкт побудований за спрощеною Feature-Sliced Design архітектурою:

text
├── server/                 # Express бекенд
│   ├── index.js            # Точка входу, API endpoints
│   ├── data.js             # Мок-дані (нерухомість, аналітика)
│   └── db.json             # Локальна база даних (користувачі)
├── src/
│   ├── app/                # Налаштування (router, providers, layout)
│   ├── pages/              # Сторінки (Home, Catalog, ARPlanner, etc.)
│   ├── features/           # Бізнес-логіка (auth, favorites, mortgage, ar-planner)
│   ├── entities/           # Доменні сутності (property, market)
│   └── shared/             # Переіспользувані ресурси (UI, API client, utils)
📡 API Документація
Auth
POST /api/auth/login — Вхід. Приймає { email, password }. Повертає { token, user }.

POST /api/auth/register — Реєстрація. Приймає { email, password, displayName }.

GET /api/auth/me — Перевірка токена. Приймає Authorization: Bearer <token>. Повертає { user }.

Properties
GET /api/properties — Список усіх об'єктів нерухомості.

GET /api/properties/:id — Деталі одного об'єкта.

Analytics
GET /api/analytics/cities — Список доступних міст.

GET /api/analytics?city=Київ — Статистика та графіки для обраного міста.

🏗 Архітектурні рішення
JWT Авторизація: Реалізована на Express-сервері. Паролі хешуються за допомогою bcrypt, токени підписуються jsonwebtoken. Фронтенд зберігає токен у localStorage та додає його до заголовків через кастомний apiRequest.

Адаптер для 360° турів: VirtualTourViewer не залежить від Pannellum напряму. Він використовує інтерфейс PanoramaAdapter, що дозволяє замінити бібліотеку без зміни UI.

3D Планувальник: Використовує useReducer для управління станом меблів. Реалізовано кастомну логіку колізій (AABB), впирання в стіни та переміщення/обертання (Gizmo + WASD/QE).

Чисті функції: Розрахунок іпотеки та фільтрація каталогу винесені в окремі модулі та покриті Unit-тестами (Vitest).

## 🔒 Безпека
Секретні ключі (JWT_SECRET) зберігаються у змінних оточення (.env), які не потрапляють у Git-репозиторій. Для налаштування середовища використовуйте файл `.env.example`.

## 🔄 CI/CD
Проєкт налаштований для безперервної інтеграції через GitHub Actions. Файл `.github/workflows/ci.yml` автоматично запускає лінтер, тести та production-збірку при кожному пуші в гілку `main`.
