import { FilterProvider } from "@/providers/FilterProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { PhotoCardProvider } from "@/providers/PhotoCardProvider";

export function Providers({ children }) {
  return (
    <FilterProvider >
      <PhotoCardProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </PhotoCardProvider>
    </FilterProvider>
  )
}