
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Index = () => {
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('twitter_authenticated');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return <Login />;
};

export default Index;
