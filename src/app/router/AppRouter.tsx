import * as React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { useAuthStore } from "../../store/useAuthStore";
import { AppShellLoader } from "../../components/shared/AppShellLoader";

// Public Pages
const Home = lazy(() => import("../../pages/Home"));
const ProductCatalog = lazy(() => import("../../pages/ProductCatalog"));
const ProductDetails = lazy(() => import("../../pages/ProductDetails"));
const Cart = lazy(() => import("../../pages/Cart"));
const Checkout = lazy(() => import("../../pages/Checkout"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const Profile = lazy(() => import("../../pages/Profile"));

// Admin Pages
const AdminDashboard = lazy(() => import("../../pages/admin/Dashboard"));
const AdminOrders = lazy(() => import("../../pages/admin/Orders"));

// Admin Product Pages
const AdminProductsList = lazy(
  () => import("../../pages/admin/products/ProductsList"),
);
const AdminProductCreate = lazy(
  () => import("../../pages/admin/products/ProductCreate"),
);
const AdminProductDetails = lazy(
  () => import("../../pages/admin/products/ProductDetails"),
);
const AdminProductEdit = lazy(
  () => import("../../pages/admin/products/ProductEdit"),
);

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Painel de Admin
          </h1>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <AppShellLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return <AppShellLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Suspense fallback={<AppShellLoader />}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductCatalog />
            </MainLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Checkout />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminProductsList />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/new"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminProductCreate />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/:id"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminProductDetails />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/:id/edit"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminProductEdit />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}