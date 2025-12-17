import { useEffect, useState } from 'react';
import { notificationService } from '../services/notificationService';

export function useFetchNotification(userId, limit = 5) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return; // 로그인 전에는 호출 X

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

  return { notifications, loading };
}
