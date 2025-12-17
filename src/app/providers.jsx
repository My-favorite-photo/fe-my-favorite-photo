'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider, { useAuth } from '@/providers/AuthProvider';
import { ExchangeProvider } from '@/providers/ExchangeProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import { ModalProvider } from '@/providers/ModalProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';

function InnerProviders({ children }) {
  const { user } = useAuth(); // AuthProvider 안에서 user 가져오기
  return (
    <NotificationProvider userId={user?.id ?? null} limit={20}>
      <ExchangeProvider>{children}</ExchangeProvider>
    </NotificationProvider>
  );
}

export function Providers({ children }) {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />

      <ModalProvider>
        <AuthProvider>
          <FilterProvider>
            <InnerProviders>{children}</InnerProviders>
          </FilterProvider>
        </AuthProvider>
      </ModalProvider>
    </>
  );
}
