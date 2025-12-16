'use client';
import { usePathname } from 'next/navigation';

import Header from '@/components/common/header/Header';
import MobileHeader from '@/components/common/header/MobileHeader';
import { publicMetadata } from '#/config/metadata';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isSellDetailPage = pathname.endsWith('/sell-detail');
  return (
    <>
      {!isSellDetailPage && (
        <>
          <Header />
          <MobileHeader />
        </>
      )}
      {children}
    </>
  );
}