import { useEffect, useState } from 'react';
import { useApi } from "./useApi";

export const useIsLogin = () => {
  const { apiFetch } = useApi();
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLocalId = !!localStorage.getItem('id');
      const isLocalToken = !!localStorage.getItem('token');

      if (isLocalId && isLocalToken) {
        try {
          const route = `users/${localStorage.getItem('id')}`;
          const dataApi = await apiFetch(false, 'GET', route, null);
          if (dataApi._id === localStorage.getItem('id')) {
            setIsLoginChecked(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, []);
  return { isLoginChecked, loading };
};