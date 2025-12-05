import AuthProvider from '@/providers/AuthProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import { ModalProvider } from '@/providers/ModalProvider';
import { PhotoCardProvider } from '@/providers/PhotoCardProvider';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <FilterProvider>
        <PhotoCardProvider>
          <ModalProvider>{children}</ModalProvider>
        </PhotoCardProvider>
      </FilterProvider>
    </AuthProvider>
  );
}
