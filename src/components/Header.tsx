import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Award, Mail, Menu, X, Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/language';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { isZh, toggleLanguage } = useLanguage();

  const navLinks = [
    { name: isZh ? '首页' : 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: isZh ? '关于我' : 'About', path: '/about', icon: <User className="w-4 h-4" /> },
    { name: isZh ? '项目' : 'Projects', path: '/projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: isZh ? '技能' : 'Skills', path: '/skills', icon: <Terminal className="w-4 h-4" /> },
    { name: isZh ? '奖项' : 'Awards', path: '/awards', icon: <Award className="w-4 h-4" /> },
    { name: isZh ? '联系' : 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              Shengxin<span className="text-blue-500">Xiao</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-md text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isZh ? 'EN' : '中文'}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-md text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isZh ? 'EN' : '中'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
