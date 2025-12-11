import AuthProvider from '@/providers/AuthProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import { ModalProvider } from '@/providers/ModalProvider';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <FilterProvider>
        <ModalProvider>{children}</ModalProvider>
      </FilterProvider>
    </AuthProvider>
  );
}
