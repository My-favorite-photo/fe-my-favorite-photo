import AuthProvider from '@/providers/AuthProvider';
import { ExchangeProvider } from '@/providers/ExchangeProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import { ModalProvider } from '@/providers/ModalProvider';

export function Providers({ children }) {
  return (
    <ModalProvider>
      <AuthProvider>
        <FilterProvider>
          <ExchangeProvider>{children}</ExchangeProvider>
        </FilterProvider>
      </AuthProvider>
    </ModalProvider>
  );
}
