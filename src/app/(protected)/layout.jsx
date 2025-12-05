import { redirect } from 'next/navigation';

import { checkAndRefreshAuth } from '@/libs/actions/auth';

import ClientLayout from './clientLayout';

export default async function Layout({ children }) {
  const isAuthenticated = await checkAndRefreshAuth();

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <ClientLayout>{children}</ClientLayout>;
}
