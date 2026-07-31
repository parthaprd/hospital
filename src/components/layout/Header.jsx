'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { LogOut, User, Bell, HeartPulse } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const Header = () => {
  const { user, logout } = useAuth();
  const { notify } = useNotification();

  return (
    <header className="h-16 bg-bg-primary border-b border-border px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3 md:hidden">
        <HeartPulse className="text-accent" size={24} />
        <span className="font-bold text-h4 text-text-primary">SKEW HMS</span>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <span className="text-caption font-bold text-text-secondary uppercase tracking-wider">Hospital Management System</span>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => notify.info('System operational: All modules connected.')}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-surface transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-divider">
            <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-body-sm uppercase">
              {user.name ? user.name.charAt(0) : <User size={16} />}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-body-sm font-semibold text-text-primary leading-tight">{user.name}</span>
              <span className="text-caption text-text-secondary capitalize leading-tight">{user.role}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="flex items-center gap-1.5 text-text-secondary hover:text-bias-left"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      )}
    </header>
  );
};
