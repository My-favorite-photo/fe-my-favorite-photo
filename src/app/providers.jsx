import { FilterProvider } from "@/providers/FilterProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { PhotoCardProvider } from "@/providers/PhotoCardProvider";

export function Providers({ children }) {
  return (
    <ModalProvider>
      <FilterProvider >
        <PhotoCardProvider>
          {children}
        </PhotoCardProvider>
      </FilterProvider>
    </ModalProvider>
  )
}