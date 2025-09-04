import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";
import { useAuth } from "./hooks/UseAuth";
import NotFound from "./pages/NotFound";
import HomePageIndex from "./pages/HomePageIndex";
import AppLayout from "./components/layouts/AppLayout";
import AppSuspense from "./pages/AppSuspense";
import { ErrorBoundary } from "./components/utils/ErrorBoundary";
import ErrorBoundedComponent from "./components/utils/ErrorBoundedComponent";
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const DeliveriesPage = lazy(() => import("./pages/DeliveriesPage"));
const DriversPage = lazy(() => import("./pages/DriversPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const PasswordResetPage = lazy(() => import("./pages/PasswordResetPage"));
const ShipmentsPage = lazy(() => import("./pages/ShipmentsPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundedComponent>
              <Suspense fallback={<AppSuspense />}>
                {isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/auth/login" />
                )}
              </Suspense>
            </ErrorBoundedComponent>
          }
        />
        <Route
          path="/auth/register"
          element={
            <ErrorBoundedComponent>
              <Suspense fallback={<AppSuspense />}>
                <SignUpPage />
              </Suspense>
            </ErrorBoundedComponent>
          }
        />
        <Route
          path="/auth/login"
          element={
            <ErrorBoundedComponent>
              <Suspense fallback={<AppSuspense />}>
                <LoginPage />
              </Suspense>
            </ErrorBoundedComponent>
          }
        />
        <Route
          path="/password-reset"
          element={
            <ErrorBoundedComponent>
              <Suspense fallback={<AppSuspense />}>
                <PasswordResetPage />
              </Suspense>
            </ErrorBoundedComponent>
          }
        />
        <Route
          path="/home"
          element={
            <ErrorBoundedComponent>
              <Suspense fallback={<AppSuspense />}>
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              </Suspense>
            </ErrorBoundedComponent>
          }
        >
          <Route index element={<HomePageIndex />} />
          <Route
            path="dashboard"
            element={
              <ErrorBoundedComponent>
                <Suspense fallback={<AppSuspense />}>
                  <DashboardPage />
                </Suspense>
              </ErrorBoundedComponent>
            }
          />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route
            path="shipments"
            element={
              <ErrorBoundedComponent>
                <Suspense fallback={<AppSuspense />}>
                  <ShipmentsPage />
                </Suspense>
              </ErrorBoundedComponent>
            }
          />
          <Route
            path="drivers"
            element={
              <ErrorBoundedComponent>
                <Suspense fallback={<AppSuspense />}>
                  <DriversPage />
                </Suspense>
              </ErrorBoundedComponent>
            }
          />
          <Route
            path="deliveries"
            element={
              <ErrorBoundedComponent>
                <Suspense fallback={<AppSuspense />}>
                  <DeliveriesPage />
                </Suspense>
              </ErrorBoundedComponent>
            }
          />
          <Route
            path="settings"
            element={
              <ErrorBoundedComponent>
                <Suspense fallback={<AppSuspense />}>
                  <SettingsPage />
                </Suspense>
              </ErrorBoundedComponent>
            }
          />
          <Route
            path="notifications"
            element={
              <ErrorBoundedComponent>
                <Suspense fallback={<AppSuspense />}>
                  <NotificationsPage />
                </Suspense>
              </ErrorBoundedComponent>
            }
          />
          <Route
            path="account"
            element={
              <ErrorBoundedComponent>
                <Suspense fallback={<AppSuspense />}>
                  <UserProfilePage />
                </Suspense>
              </ErrorBoundedComponent>
            }
          />
          <Route element={<NotFound />} />
        </Route>
        <Route element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
