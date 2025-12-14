import { useEffect, useState } from 'react';

import { userService } from '../services/userService';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getMe();

        if (response.user) {
          setUser(response.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to fetch 유저 데이터', error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return {
    currentUser: user,
    currentUserId: user?.id,
    loading,
    isLoggedIn,
  };
};
