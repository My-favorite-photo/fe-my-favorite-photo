'use client';

import { createContext, useContext, useState, useEffect } from 'react';
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
  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, loading, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
