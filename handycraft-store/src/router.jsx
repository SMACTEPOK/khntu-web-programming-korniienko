import { createBrowserRouter } from "react-router"
import RootLayout from "./layouts/RootLayout"
import CatalogPage from "./pages/CatalogPage"
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"
import OrderPage from "./pages/OrderPage"
import NotFoundPage from "./pages/NotFoundPage"
import CartPage from "./components/CartPage/CartPage"
import RouteErrorBoundary from "./components/RouteErrorBoundary/RouteErrorBoundary"
import ProtectedRoute from "./components/ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import OrdersPage from "./pages/OrdersPage"
import { productLoader } from "./loaders/productLoader"
import { orderLoader } from "./loaders/orderLoader"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <RouteErrorBoundary />,
        children: [
          { index: true, element: <CatalogPage /> },
          { path: "category/:categorySlug", element: <CategoryPage /> },
          { 
            path: "product/:productId", 
            element: <ProductPage />, 
            loader: productLoader,
            hydrateFallbackElement: <p className="text-center font-mono text-muted py-10">Завантаження товару…</p>
          },
          { 
            path: "order/:orderId", 
            element: <OrderPage />, 
            loader: orderLoader,
            hydrateFallbackElement: <p className="text-center font-mono text-muted py-10">Завантаження замовлення…</p>
          },
          { path: "cart", element: <CartPage /> },
          { path: "login", element: <LoginPage /> },
          {
            element: <ProtectedRoute />,
            children: [
              { path: "orders", element: <OrdersPage /> }
            ]
          },
          { path: "*", element: <NotFoundPage /> }
        ]
      }
    ]
  }
])
