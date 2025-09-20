'use client';

import React, { useState, Suspense } from 'react';
import { Header } from '@/widgets/Header/ui/Header';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';
import Loading from './loading';
import { CMSProvider } from '@/context/cmsContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <CMSProvider>
      <div className="bg-background-base flex h-screen">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </div>
      </div>
    </CMSProvider>
  );
}
