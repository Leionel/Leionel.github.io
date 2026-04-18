import { useState } from 'react';
import personalData from '../data/personal.json';
import { Mail, Github, MessageSquare, Phone, Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/language';

const Contact = () => {
  const { isZh } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactMethods = [
    {
      key: 'email',
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      label: isZh ? '邮箱' : 'Email',
      value: personalData.contact.email,
      action: () => handleCopy(personalData.contact.email, 'email'),
    },
    {
      key: 'phone',
      icon: <Phone className="w-6 h-6 text-blue-500" />,
      label: isZh ? '电话' : 'Phone',
      value: personalData.contact.phone,
      action: () => handleCopy(personalData.contact.phone, 'phone'),
    },
    {
      key: 'wechat',
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      label: isZh ? '微信' : 'WeChat',
      value: personalData.contact.wechat,
      action: () => handleCopy(personalData.contact.wechat, 'wechat'),
    },
    {
      key: 'github',
      icon: <Github className="w-6 h-6 text-blue-500" />,
      label: 'GitHub',
      value: `@${personalData.contact.github}`,
      action: () => window.open(`https://github.com/${personalData.contact.github}`, '_blank'),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">{isZh ? '联系我' : 'Get In Touch'}</h1>
        <p className="text-slate-400 text-lg">
          {isZh
            ? '欢迎交流项目合作、创意想法或任何你感兴趣的话题。'
            : "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactMethods.map((method, i) => (
          <div
            key={i}
            onClick={method.action}
            className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                {method.icon}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">{method.label}</p>
                <p className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{method.value}</p>
              </div>
            </div>
            <div className="text-slate-500 group-hover:text-blue-500 transition-colors">
              {copied === method.key ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </div>
          </div>
        ))}
      </div>

      <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6">
        <h2 className="text-2xl font-bold text-white">{isZh ? '开始交流吧' : "Let's start a conversation"}</h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          {isZh
            ? '你可以通过以上任一方式联系我，我通常会在 24 小时内回复。'
            : 'Feel free to reach out via any of these channels. I typically respond within 24 hours.'}
        </p>
        <div className="pt-4">
          <a
            href={`mailto:${personalData.contact.email}`}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all inline-block shadow-lg shadow-blue-500/20"
          >
            {isZh ? '发送邮件' : 'Send an Email'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
