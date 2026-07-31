'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getSidebarLinks } from '@/lib/utils/permissions';
import {
  HeartPulse,
  LayoutDashboard,
  User,
  UserPlus,
  Users,
  Calendar,
  CalendarPlus,
  FileText,
  FilePlus,
  FlaskConical,
  TestTube,
  CreditCard,
  Receipt,
  Package,
  PackagePlus,
  Pill,
  Clock,
  Stethoscope,
  Briefcase,
  BarChart2,
  TrendingUp,
  Terminal,
  Settings,
  Search,
} from 'lucide-react';

const iconMap = {
  HeartPulse,
  LayoutDashboard,
  User,
  UserPlus,
  Users,
  Calendar,
  CalendarPlus,
  FileText,
  FilePlus,
  FlaskConical,
  TestTube,
  CreditCard,
  Receipt,
  Package,
  PackagePlus,
  Pill,
  Clock,
  Stethoscope,
  Briefcase,
  BarChart2,
  TrendingUp,
  Terminal,
  Settings,
  Search,
};

export const Sidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const links = getSidebarLinks(user.role);

  return (
    <aside className="w-[260px] bg-bg-primary border-r border-border flex flex-col justify-between p-6 shrink-0 sticky top-0 h-screen select-none overflow-y-auto scrollbar-thin">
      <div className="flex flex-col gap-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-h3 text-text-primary">
          <HeartPulse className="text-accent" size={24} />
          <span>SKEW HMS</span>
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-3 p-3 rounded-md bg-surface border border-border">
          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold uppercase text-body-sm">
            {user.name ? user.name.charAt(0) : 'U'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-body-sm font-bold text-text-primary truncate">{user.name}</h4>
            <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">{user.role}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const Icon = iconMap[link.icon] || LayoutDashboard;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-body-sm font-medium transition-all ${
                  isActive
                    ? 'bg-text-primary text-bg-primary shadow-sm'
                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-divider text-caption text-text-secondary text-center">
        <span>SKEW Healthcare &copy; 2026</span>
      </div>
    </aside>
  );
};
