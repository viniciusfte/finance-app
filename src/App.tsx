import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Welcome/WelcomePage.tsx';
import LoginPage from './pages/Login/LoginPage.tsx';
import RegisterPage from './pages/Register/RegisterPage.tsx'; 
import { ThemeProvider } from './components/theme-provider.tsx';
import DashboardPage from './pages/Dashboard/DashboardPage.tsx';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 

        
      <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;