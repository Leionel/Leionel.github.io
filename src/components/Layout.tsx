import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col text-ink">
      <Header />
      <main className="flex-grow pt-16">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
