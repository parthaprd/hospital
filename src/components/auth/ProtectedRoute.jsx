'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/common/Loader';
import { canAccess, getDashboardRoute } from '@/lib/utils/permissions';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to user's proper home dashboard
        router.push(getDashboardRoute(user.role));
      } else if (!canAccess(user.role, pathname)) {
        router.push(getDashboardRoute(user.role));
      }
    }
  }, [user, loading, allowedRoles, pathname, router]);

  if (loading) return <PageLoader />;
  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};
