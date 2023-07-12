import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePreventAccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasItem = localStorage.getItem('userInfo');
    if (hasItem) {
      navigate(-1); // Redirect to the dashboard or another protected route
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Prompt an empty string to prevent leaving the page
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);
}