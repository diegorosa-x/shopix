import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { useAuthStore } from '../../store/useAuthStore';

// Lazy load pages
const Home = lazy(() => import('../../pages/Home'));
const ProductCatalog = lazy(() => import('../../pages/ProductCatalog'));
const ProductDetails = lazy(() => import('../../pages/ProductDetails'));
const Cart = lazy(() => import('../../pages/Cart'));
const Checkout = lazy(() => import('../../pages/Checkout'));
const Login = lazy(() => import('../../pages/Login'));
const Profile = lazy(() => import('../../pages/Profile'));

// Admin Pages
const AdminDashboard = lazy(() => import('../../pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('../../pages/admin/Products'));
const AdminOrders = lazy(() => import('../../pages/admin/Orders'));

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b border-zinc-200 bg-white px-8">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </header>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/products" element={<MainLayout><ProductCatalog /></MainLayout>} />
        <Route path="/products/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/checkout" element={<ProtectedRoute><MainLayout><Checkout /></MainLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
        <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
