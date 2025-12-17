'use client';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import AuthProvider, { useAuth } from '@/providers/AuthProvider';
import { ExchangeProvider } from '@/providers/ExchangeProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import { ModalProvider } from '@/providers/ModalProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';

function InnerProviders({ children }) {
  const { user } = useAuth(); // AuthProvider 안에서 user 가져오기
  return (
    <NotificationProvider userId={user?.id ?? null} limit={20}>
      <ExchangeProvider>
        {children}
      </ExchangeProvider>
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

      <FilterProvider>
        <ModalProvider >
          <AuthProvider>
            <InnerProviders>
              {children}
            </InnerProviders>
          </AuthProvider>
        </ModalProvider>
      </FilterProvider>
    </>
  );
}
