import { Github, Mail, Phone, MessageSquare } from 'lucide-react';
import personalData from '../data/personal.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Shengxin<span className="text-blue-500">Xiao</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xs">
            Mathematics & Statistics student at Wuhan University. Passionate about AI & Document Understanding.
          </p>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href={`https://github.com/${personalData.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${personalData.contact.email}`}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={`tel:${personalData.contact.phone}`}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
          >
            <Phone className="w-5 h-5" />
          </a>
          <div className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800 relative group cursor-pointer">
            <MessageSquare className="w-5 h-5" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              WeChat: {personalData.contact.wechat}
            </div>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Shengxin Xiao. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
