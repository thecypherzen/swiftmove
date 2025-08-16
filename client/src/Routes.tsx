import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./hooks/ProtectedRoute";
import PasswordResetPage from "./pages/PasswordResetPage";
import { useAuth } from "./hooks/UseAuth";
import AppLayout from "./components/layouts/AppLayout";
import AnalyticsPage from "./pages/AnalyticsPage";
import DashboardPage from "./pages/DashboardPage";
import DeliveriesPage from "./pages/DeliveriesPage";
import DriversPage from "./pages/DriversPage";
import HomePageIndex from "./pages/HomePageIndex";
import ShipmentsPage from "./pages/ShipmentsPage";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />
        <Route path="/auth/register" element={<SignUpPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/home" element={<AppLayout />}>
					<Route index element={<HomePageIndex />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="shipments" element={<ShipmentsPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="deliveries" element={<DeliveriesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
