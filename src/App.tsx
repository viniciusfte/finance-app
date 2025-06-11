import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Welcome/WelcomePage.tsx';
import LoginPage from './pages/Login/LoginPage.tsx';
import RegisterPage from './pages/Register/RegisterPage.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import DashboardPage from './pages/Dashboard/DashboardPage.tsx';
import TransactionsPage from './pages/Transactions/TransactionsPage.tsx';
import CategoriesPage from './pages/Categories/CategoriesPage.tsx';
import SettingsPage from './pages/Settings/SettingsPage.tsx';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;