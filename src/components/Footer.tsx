import { Github, Mail, Phone, MessageSquare } from 'lucide-react';
import personalData from '../data/personal.json';
import { useLanguage } from '../contexts/language';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isZh } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Shengxin<span className="text-primary-400">Xiao</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xs">
            {isZh
              ? '武汉大学数学与统计学院本科生，关注 AI 与文档理解。'
              : 'Mathematics & Statistics student at Wuhan University. Passionate about AI & Document Understanding.'}
          </p>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href={`https://github.com/${personalData.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${personalData.contact.email}`}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={`tel:${personalData.contact.phone}`}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
            aria-label="Phone"
          >
            <Phone className="w-5 h-5" />
          </a>
          <div className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800 relative group cursor-pointer" aria-label="WeChat">
            <MessageSquare className="w-5 h-5" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isZh ? '微信' : 'WeChat'}: {personalData.contact.wechat}
            </div>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Shengxin Xiao. {isZh ? '保留所有权利。' : 'All rights reserved.'}
          </p>
          <p className="text-slate-600 text-xs mt-1">{isZh ? '基于 React 与 Tailwind CSS 构建' : 'Built with React & Tailwind CSS'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
