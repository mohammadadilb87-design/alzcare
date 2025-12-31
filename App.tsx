import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detection from './pages/Detection';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import SplashScreen from './components/SplashScreen';
import ChatWidget from './components/ChatWidget';
import { User as UserType } from './types';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isRegisteredView, setIsRegisteredView] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    const saved = localStorage.getItem('alzcare_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeTab, setActiveTab] = useState(() => {
    return currentUser?.role === 'ADMIN' ? 'admin_dashboard' : 'detection';
  });

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    localStorage.setItem('alzcare_user', JSON.stringify(user));
    localStorage.setItem('alzcare_auth', 'true');
    setActiveTab(user.role === 'ADMIN' ? 'admin_dashboard' : 'detection');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('alzcare_user');
    localStorage.removeItem('alzcare_auth');
  };

  const renderContent = () => {
    if (!currentUser) return null;

    switch (activeTab) {
      case 'home':
        return <Home onNavigate={setActiveTab} />;
      case 'detection':
        return <Detection />;
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return <About />;
      case 'admin_dashboard':
        return <AdminDashboard />;
      default:
        return <Detection />;
    }
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (isRegisteredView) {
    return <Register onBack={() => setIsRegisteredView(false)} />;
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} onNavigateToRegister={() => setIsRegisteredView(true)} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={handleLogout} 
      role={currentUser.role}
      userName={currentUser.name}
    >
      {renderContent()}
      <ChatWidget />
    </Layout>
  );
};

export default App;