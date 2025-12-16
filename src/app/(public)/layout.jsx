'use client';
import { usePathname } from 'next/navigation';

import Header from '@/components/common/header/Header';
import { publicMetadata } from '#/config/metadata';
import MobileHeader from '@/components/common/header/MobileHeader';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isCompletePage = pathname.endsWith('/sell-detail');
  return (
    <>
      {!isCompletePage && (
        <>
          <Header />
          <MobileHeader />
        </>
      )}
      {children}
    </>
  );
}
