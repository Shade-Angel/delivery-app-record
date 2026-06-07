# Delivery App Record

**Автор:** Мухаметов С.М.
**Группа:**  ТОП-ИТ-101Б


## Описание проекта

Мобильное клиентно-серверное  приложение (монолит) , по функционалу что-то среднее между самокатом и kfc  
Пользователь может просматривать каталог товаров, добавлять их в корзину, оформлять заказ и оплачивать через Stripe (в данном случае в тестовом режиме).  
Приложение имеет полноценную JWT-аутентификацию с обновлением токенов, историю заказов и выбором избранного.


##  Структура проекта

### Клиент
<img width="auto" heigth="auto" src="./images/WidthViewClient.png"> 

Папка app <br>
<img width="auto" heigth="auto" src="./images/Folder_app.png">

delivery-app-record/<br>
├── client/ # React Native (Expo) клиент<br>
│ ├── app/<br>
│ │ ├── components/ # UI-компоненты (категории, продукты, корзина, поиск и другие скрины)<br>
│ │ ├── config/ # Определяет базовые URL для API и вспомогательные функции для построения эндпоинтов.<br>
│ │ ├── navigation/ # Настройка навигации (стек, вкладки)<br>
│ │ ├── providers/ # Провайдеры (Auth, Stripe, Redux)<br>
│ │ ├── services/ # API-клиенты (order, auth, product)<br>
│ │ ├── store/ # Redux store + slices (корзина, избранное)<br>
│ │ ├── types/ # TypeScript интерфейсы (auth, user)<br>
│ │ └── utils/ # Утилиты (converPrice, getMediaSource)<br>

Файлы и структура 

* Точка входа: client/App.tsx

    &mdash; Обёртки: QueryClientProvider (React Query), Provider (Redux), PersistGate (Redux Persist), AuthProvider (кастомный), SafeAreaProvider, StripeProvider<br>
    &mdash; Улитка: Navigation компонент.<br>

* Навигация: client/app/navigation/

    &mdash; Navigation.tsx – главный контейнер, проверяет user и рендерит BottomMenu.<br>
    &mdash; PrivateNavigator.tsx – условный рендеринг (Auth или экраны).<br>
    &mdash; routes.ts – список экранов (Home, Favorites, Cart, Profile, etc.).<br>

* Управление состоянием:

    &mdash; Redux Toolkit – корзина (cart.slice), избранное (favorites.slice).<br>
    &mdash; React Query – для данных с сервера (продукты, категории, профиль).<br>
    &mdash; Redux Persist – сохранение корзины и избранного в AsyncStorage.<br>

* Сервисы API: client/app/services/

    &mdash; order.service.ts, product.service.ts, category.service.ts, user.service.ts, auth.service.ts.<br>
    &mdash; api/request.api.ts – обёртка над Axios с тостами.<br>
    &mdash; api/interceptors.api.ts – перехватчик: добавляет Bearer токен, обрабатывает 401 и обновление токенов.<br>
    &mdash; api/helper.auth.ts – функция getNewTokens(запрашивает у сервера токены).<br>
    &mdash; auth/auth.helper.ts – работа с SecureStore (сохранение/чтение токенов).<br>

* Аутентификация:

    &mdash; AuthProvider.tsx – контекст с user, isLoading, проверка токена при старте.<br>
    &mdash; useCheckAuth.ts – проверяет refresh token при смене маршрута.<br>
    &mdash; useAuth.ts – хук для доступа к контексту.<br>

* Экраны:

    &mdash; auth/Auth.tsx – форма входа/регистрации.<br>
    &mdash; home/Home.tsx – главный экран (Header, Banner, Categories, Products).<br>
    &mdash; cart/Cart.tsx – корзина, кнопка оформления заказа.<br>
    &mdash; profile/Profile.tsx – профиль, кнопка Logout, избранное.<br>
    &mdash; product/Product.tsx – детальная карточка товара.<br>
    &mdash; order/ – экран спасибо.<br>

* Хуки:

    &mdash; useCart.ts – доступ к корзине из Redux.<br>
    &mdash; useCheckout.ts – оформление заказа (сборка данных, вызов Stripe).<br>
    &mdash; useProfile.ts – запрос профиля через React Query.<br>

* Утилиты:

    &mdash; converPrice.ts – форматирует как доллары с центами.<br>
    &mdash; getMediaSource - помогает с фотографиями, "строит пути"<br>

* Стилизация: NativeWind (Tailwind CSS).



### Серверная часть (NestJS)

<img heigth="auto" width="auto" src="./images/FullViewServer.png">

Папка src
<img heig>
Главный файл: server/src/main.ts

setGlobalPrefix('api')

useStaticAssets для папки uploads

Глобальный фильтр исключений TokenExpiredFilter (превращает TokenExpiredError в 401)

Модули:

AuthModule – логин, регистрация, выдача/обновление токенов.

UserModule – профиль, избранное.

CategoryModule – категории (CRUD).

ProductModule – продукты (CRUD, поиск по категориям).

OrderModule – заказы, Stripe интеграция.

Аутентификация:

jwt.strategy.ts – валидация JWT, ignoreExpiration: false, возвращает null → 401.

auth.service.ts – login, register, issueTokens (access: 1h, refresh: 7d).

Кастомный декоратор @Auth() – UseGuards(AuthGuard('jwt')).

Декоратор @CurrentUser('id') – извлекает user.id из request.user.

Работа с БД: PrismaService (в utisl/prisma.service.ts).

Модели: User, Product, Category, Order, OrderItem.

seed.ts – заполнение категорий, продуктов, демо-пользователя.

Заказы и Stripe:

order.controller.ts – POST /orders (с @Auth()), принимает OrderDto (items).

order.service.ts – вычисляет total из items (цены в центах), создаёт заказ в БД, затем создаёт PaymentIntent в Stripe с amount: total (total уже в центах – исправлено), возвращает clientSecret.

Stripe инициализируется с process.env.STRIPE_SECRET_KEY.

Статика: ServeStaticModule раздаёт папку uploads по /uploads.
