import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';
import CommandPalette from './CommandPalette';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setCmdOpen(true);
    window.addEventListener('open-command-palette', handleOpen);
    return () => window.removeEventListener('open-command-palette', handleOpen);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col text-ink selection:bg-indigo-500/20">
      <ScrollProgress />
      <Header />
      <main className="flex-grow pt-16">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">{children}</div>
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
};

export default Layout;
