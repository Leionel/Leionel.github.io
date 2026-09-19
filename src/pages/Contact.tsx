import { useState } from 'react';
import personalData from '../data/personal.json';
import { ArrowRight, ArrowUpRight, Check, Copy, Github, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/language';
import { Reveal } from '../components/ui';
import SpotlightCard from '../components/SpotlightCard';
import BorderBeam from '../components/BorderBeam';

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
            <SpotlightCard
              onClick={method.action}
              className="group flex w-full cursor-pointer items-center justify-between gap-4 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card-muted/80 text-ink-muted transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                  {method.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{method.label}</p>
                  <p className="mt-1 truncate text-[15px] font-semibold text-ink group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {method.value}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-ink-faint transition-colors group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                {method.external ? (
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                ) : copied === method.key ? (
                  <span className="flex items-center gap-1 font-mono text-xs text-emerald-500 font-medium">
                    <Check className="h-4 w-4" />
                    {isZh ? '已复制' : 'Copied'}
                  </span>
                ) : (
                  <Copy className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                )}
              </span>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="gradient-border relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-16 shadow-lg shadow-indigo-500/5">
          <BorderBeam size={280} duration={14} />
          <h2 className="relative text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {isZh ? '开始一段对话' : 'Start a conversation'}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
            {isZh
              ? '欢迎实习机会、科研合作，或任何有意思的 Agent 项目交流。'
              : 'Open to internships, research collaborations, and interesting agent projects.'}
          </p>
          <a
            href={`mailto:${personalData.contact.email}`}
            className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3 text-sm font-semibold text-canvas shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
          >
            <Mail className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            <span className="relative z-10">{isZh ? '发送邮件' : 'Send an Email'}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default Contact;
