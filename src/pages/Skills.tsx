import { Brain, Globe, Settings, Terminal } from 'lucide-react';
import skillsData from '../data/skills.json';
import { useLanguage } from '../contexts/language';
import { Reveal, Tag } from '../components/ui';

const categoryIcons: Record<string, React.ReactNode> = {
  'Core Tech Stack': <Terminal className="h-5 w-5" />,
  'Math & Algorithms': <Brain className="h-5 w-5" />,
  'Engineering & Tools': <Settings className="h-5 w-5" />,
  'Language & Others': <Globe className="h-5 w-5" />,
};

const Skills = () => {
  const { isZh } = useLanguage();

  return (
    <div className="space-y-16 md:space-y-24">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
          {isZh ? '技能' : 'Skills'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isZh ? '技术与能力' : 'Skills & Expertise'}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {isZh
            ? '数理基础、深度学习工程与开发工具的交叉组合。'
            : 'The intersection of mathematical foundations, deep-learning engineering, and developer tooling.'}
        </p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {skillsData.map((category, i) => (
          <Reveal key={category.category} delay={i * 70}>
            <div className="h-full rounded-2xl border border-edge bg-card p-7 transition-colors hover:border-edge-strong sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-500 dark:text-indigo-400">
                  {categoryIcons[category.category]}
                </span>
                <h2 className="text-[17px] font-semibold tracking-tight text-ink">
                  {isZh ? category.categoryZh : category.category}
                </h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((s) => (
                  <Tag key={s.name} className="px-3 py-1.5 text-xs">
                    {s.name}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <figure className="gradient-border rounded-3xl px-8 py-12 text-center sm:px-16">
          <blockquote className="relative mx-auto max-w-2xl text-xl font-medium leading-relaxed tracking-tight text-ink sm:text-2xl">
            <span aria-hidden className="absolute -left-2 -top-6 select-none font-mono text-5xl text-indigo-500/30 sm:-left-8">
              “
            </span>
            {isZh ? '数学是科学的逻辑，代码是它的表达。' : 'Math is the logic of science; code is its manifestation.'}
          </blockquote>
          <figcaption className="mt-4 text-sm text-ink-faint">
            {isZh ? '持续学习，探索 AI 研究的新边界。' : 'Continuously learning, exploring new frontiers in AI research.'}
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
};

export default Skills;
