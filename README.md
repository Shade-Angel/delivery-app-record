# Delivery App Record

**Автор:** Мухаметов С.М.
**Группа:**  ТОП-ИТ-101Б


## Описание проекта

Мобильное приложение что-то среднее между самокатом и kfc  
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

- Обёртки: QueryClientProvider (React Query), Provider (Redux), PersistGate (Redux Persist), AuthProvider (кастомный), SafeAreaProvider, StripeProvider.
- Улитка: Navigation компонент.

* Навигация: client/app/navigation/

- Navigation.tsx – главный контейнер, проверяет user и рендерит BottomMenu.
- PrivateNavigator.tsx – условный рендеринг (Auth или экраны).
- routes.ts – список экранов (Home, Favorites, Cart, Profile, etc.).

* Управление состоянием:

- Redux Toolkit – корзина (cart.slice), избранное (favorites.slice).
- React Query – для данных с сервера (продукты, категории, профиль).
- Redux Persist – сохранение корзины и избранного в AsyncStorage.

* Сервисы API: client/app/services/

- order.service.ts, product.service.ts, category.service.ts, user.service.ts, auth.service.ts.
- api/request.api.ts – обёртка над Axios с тостами.
- api/interceptors.api.ts – перехватчик: добавляет Bearer токен, обрабатывает 401 и обновление токенов.
- api/helper.auth.ts – функция getNewTokens(запрашивает у сервера токены).
- auth/auth.helper.ts – работа с SecureStore (сохранение/чтение токенов).

* Аутентификация:

- AuthProvider.tsx – контекст с user, isLoading, проверка токена при старте.
- useCheckAuth.ts – проверяет refresh token при смене маршрута.
- useAuth.ts – хук для доступа к контексту.

* Экраны:

* - auth/Auth.tsx – форма входа/регистрации.
* - home/Home.tsx – главный экран (Header, Banner, Categories, Products).
* * cart/Cart.tsx – корзина, кнопка оформления заказа.
 - profile/Profile.tsx – профиль, кнопка Logout, избранное.
- - product/Product.tsx – детальная карточка товара.
- - order/ – экран спасибо.

* Хуки:

- useCart.ts – доступ к корзине из Redux.
- useCheckout.ts – оформление заказа (сборка данных, вызов Stripe).
- useProfile.ts – запрос профиля через React Query.

* Утилиты:

- converPrice.ts – форматирует как доллары с центами.
- getMediaSource - помогает с фотографиями, "строит пути"
