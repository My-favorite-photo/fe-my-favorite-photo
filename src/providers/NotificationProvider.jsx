'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { notificationService } from '@/libs/services/notificationService';

const NotificationContext = createContext(null);

export function NotificationProvider({ userId, limit = 20, children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchNotifications() {
      try {
        setLoading(true);
        const data = await notificationService.getLatest(userId, limit);
        setNotifications(data);
      } catch (error) {
        console.error('알림 조회 실패', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [userId, limit]);

  // 개별 알림 읽음 처리
  // const markAsRead = (id) => {
  //   setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  // };
  const markAsRead = async (id) => {
    try {
      // 로컬 업뎃
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));

      // 서버 반영
      await notificationService.markAsRead(id);
    } catch (error) {
      console.error('알림 읽음 처리 실패', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, loading, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
