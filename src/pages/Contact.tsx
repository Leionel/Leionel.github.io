import { useState } from 'react';
import personalData from '../data/personal.json';
import { ArrowUpRight, Check, Copy, Github, Mail, MessageSquare, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/language';
import { Reveal } from '../components/ui';

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
      icon: <Mail className="h-5 w-5" />,
      label: isZh ? '邮箱' : 'Email',
      value: personalData.contact.email,
      action: () => handleCopy(personalData.contact.email, 'email'),
      external: false,
    },
    {
      key: 'phone',
      icon: <Phone className="h-5 w-5" />,
      label: isZh ? '电话' : 'Phone',
      value: personalData.contact.phone,
      action: () => handleCopy(personalData.contact.phone, 'phone'),
      external: false,
    },
    {
      key: 'wechat',
      icon: <MessageSquare className="h-5 w-5" />,
      label: isZh ? '微信' : 'WeChat',
      value: personalData.contact.wechat,
      action: () => handleCopy(personalData.contact.wechat, 'wechat'),
      external: false,
    },
    {
      key: 'github',
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      value: `@${personalData.contact.github}`,
      action: () => window.open(`https://github.com/${personalData.contact.github}`, '_blank'),
      external: true,
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
          {isZh ? '联系' : 'Contact'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isZh ? '保持联系' : 'Get in Touch'}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {isZh
            ? '欢迎交流项目合作、研究想法，或任何你感兴趣的话题。'
            : 'Open to collaborations, research ideas, or anything interesting you want to talk about.'}
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {contactMethods.map((method, i) => (
          <Reveal key={method.key} delay={i * 60}>
            <button
              onClick={method.action}
              className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-edge bg-card p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-edge-strong hover:shadow-lg hover:shadow-zinc-950/[0.05] sm:p-7"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card-muted text-ink-muted transition-colors group-hover:bg-indigo-500/10 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                  {method.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">{method.label}</p>
                  <p className="mt-1 truncate text-[15px] font-medium text-ink">{method.value}</p>
                </div>
              </div>
              <span className="shrink-0 text-ink-faint transition-colors group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                {method.external ? (
                  <ArrowUpRight className="h-[18px] w-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                ) : copied === method.key ? (
                  <Check className="h-[18px] w-[18px] text-emerald-500" />
                ) : (
                  <Copy className="h-[18px] w-[18px]" />
                )}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="gradient-border rounded-3xl px-8 py-14 text-center sm:px-16">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {isZh ? '开始一段对话' : 'Start a conversation'}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
            {isZh
              ? '通过以上任意方式联系我，通常会在 24 小时内回复。'
              : 'Reach out through any channel above — I usually reply within 24 hours.'}
          </p>
          <a
            href={`mailto:${personalData.contact.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-canvas transition-all hover:opacity-85 hover:shadow-lg hover:shadow-zinc-950/10"
          >
            <Mail className="h-4 w-4" />
            {isZh ? '发送邮件' : 'Send an Email'}
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default Contact;
