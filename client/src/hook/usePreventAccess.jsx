import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePreventAccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasItem = localStorage.getItem('userInfo');
    if (hasItem) {
      navigate(-1); // Redirect to the dashboard or another protected route
    }
  }, [navigate]);
}