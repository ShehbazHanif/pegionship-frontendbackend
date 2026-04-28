import { Route, Routes, Navigate } from "react-router-dom";
import { NAV_LINKS } from "./utils/navLinks";
import { useAuth } from "./context/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Auth/Login";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
        {NAV_LINKS.map(
          (link) =>
            link.element && (
              <Route
                key={link.path}
                path={link.path}
                element={<link.element />}
              />
            ),
        )}
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
