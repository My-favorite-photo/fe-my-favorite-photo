'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { getServerSideToken, loginAction, registerAction } from '@/libs/actions/auth';
import { authService } from '@/libs/services/authService';
import { getRandomPointEligibility } from '@/libs/services/randomPointService';
import { userService } from '@/libs/services/userService';

import { useModal } from './ModalProvider';

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  register: () => {},
  getUser: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const isLoggedIn = !!user;

  const getUser = async () => {
    try {
      const res = await userService.getMe();
      setUser(res.user);
    } catch (error) {
      console.error('사용자 정보를 가져오는데 실패했습니다:', error);
      setUser(null);
    }
  };

  const updateBalance = (delta) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        balance: prev.balance + delta,
      };
    });
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    const { success } = await registerAction(nickname, email, password, passwordConfirmation);
    if (!success) throw new Error('회원가입 실패');
    router.push('/login');
  };

  const login = async (email, password) => {
    const { userData, success } = await loginAction(email, password);
    if (!success) throw new Error('로그인 실패');
    setUser(userData);
    console.log('login userData:', userData);
    router.push('/market-place');
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setRandomChecked(false);

      if (randomModalTimeoutRef.current) {
        clearTimeout(randomModalTimeoutRef.current);
        randomModalTimeoutRef.current = null;
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const { openModal, MODAL_TYPES } = useModal();
  const randomModalTimeoutRef = useRef(null);
  const [randomChecked, setRandomChecked] = useState(false);

  useEffect(() => {
    if (!user || randomChecked) return;

    async function checkRandomPoint() {
      try {
        const { canTry } = await getRandomPointEligibility();

        if (canTry) {
          randomModalTimeoutRef.current = setTimeout(() => {
            openModal(MODAL_TYPES.RANDOM_POINT);
          }, 10_000);
        }

        setRandomChecked(true);
      } catch (error) {
        console.error('랜덤 포인트 eligibility 실패', error);
      }
    }

    checkRandomPoint();
    +   
     return () => {
     if (randomModalTimeoutRef.current) {
      clearTimeout(randomModalTimeoutRef.current);
      randomModalTimeoutRef.current = null;
     }
    };
  }, [user, randomChecked, openModal, MODAL_TYPES.RANDOM_POINT]);

  useEffect(() => {
    async function fetchUser() {
      const token = await getServerSideToken();
      if (token) {
        getUser();
      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, getUser, isLoggedIn, updateBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
}
