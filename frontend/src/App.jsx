import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Tasks from './pages/Tasks';
import HR from './pages/HR';
import Finance from './pages/Finance';
import Accounting from './pages/Accounting';
import Tools from './pages/Tools';
import Admin from './pages/Admin';

function PrivateRoute({ children }) {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { token } = useAuthStore();
  return token ? <Navigate to="/" replace /> : children;
}

function AppInit({ children }) {
  const { token, fetchMe } = useAuthStore();
  useEffect(() => { if (token) fetchMe(); }, [token]);
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInit>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="chat" element={<Chat />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="hr" element={<HR />} />
            <Route path="finance" element={<Finance />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="tools" element={<Tools />} />
            <Route path="admin/*" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppInit>
    </BrowserRouter>
  );
}
