import { ToastContainer } from 'react-toastify';

import AuthProvider from '@/providers/AuthProvider';
import { ExchangeProvider } from '@/providers/ExchangeProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import { ModalProvider } from '@/providers/ModalProvider';

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
            <ExchangeProvider>{children}</ExchangeProvider>
          </FilterProvider>
        </AuthProvider>
      </ModalProvider>
    </>
  );
}
