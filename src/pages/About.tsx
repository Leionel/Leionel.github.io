import { Camera, GraduationCap, Mail, MapPin, Music2, Trophy, User } from 'lucide-react';
import personalData from '../data/personal.json';
import { useLanguage } from '../contexts/language';
import { Reveal, SectionHeading, Tag } from '../components/ui';

const About = () => {
  const { isZh } = useLanguage();

  const hobbies = [
    {
      icon: <Trophy className="h-4 w-4" />,
      title: isZh ? '运动' : 'Sports',
      items: isZh ? ['足球', '篮球', 'F1'] : ['Football', 'Basketball', 'F1'],
    },
    {
      icon: <Music2 className="h-4 w-4" />,
      title: isZh ? '音乐' : 'Music',
      items: [],
    },
    {
      icon: <Camera className="h-4 w-4" />,
      title: isZh ? '摄影' : 'Photography',
      items: [],
    },
  ];

  return (
    <div className="space-y-20 md:space-y-28">
      {/* ------------------------------ Header ----------------------------- */}
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
          {isZh ? '关于我' : 'About'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isZh ? '你好，我是肖圣鑫' : 'Hi, I’m Shengxin Xiao'}
        </h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {isZh ? (
            <>
              <p>
                我就读于<strong className="font-semibold text-ink">武汉大学数学与统计学院</strong>
                信息与计算科学专业（自强班），研究让智能系统变得可靠所需的数学基础——线性代数、概率论与数值方法。
              </p>
              <p>
                当前关注点是<strong className="font-semibold text-ink">智能体的可靠性</strong>
                ：构建让 LLM 安全行动的 Harness、编排多智能体协作，以及让数学推理建立在工具可验证的计算之上。
                我喜欢能从理论一路闭环到可运行系统的工作。
              </p>
            </>
          ) : (
            <>
              <p>
                I study <strong className="font-semibold text-ink">Information and Computing Science (Ziqiang Class)</strong> at
                Wuhan University’s School of Mathematics and Statistics — the mathematics that makes intelligent systems
                trustworthy: linear algebra, probability, and numerical methods.
              </p>
              <p>
                My current focus is <strong className="font-semibold text-ink">agent reliability</strong>: building harnesses
                that let LLMs act safely, coordinating multi-agent systems, and grounding mathematical reasoning in
                tool-verified computation. I like work that closes the loop from theory to something you can actually run.
              </p>
            </>
          )}
        </div>
      </Reveal>

      {/* --------------------- Education + info sidebar -------------------- */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="h-full rounded-2xl border border-edge bg-card p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-ink">{isZh ? '教育背景' : 'Education'}</h2>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  {isZh ? personalData.education.universityZh : personalData.education.university}
                </h3>
                <span className="rounded-full bg-card-muted px-3 py-1 font-mono text-xs text-ink-muted">
                  {isZh ? personalData.education.periodZh : personalData.education.period}
                </span>
              </div>
              <p className="mt-2 text-[15px] text-ink-muted">
                {isZh ? personalData.education.collegeZh : personalData.education.college}
              </p>
              <p className="mt-1 text-sm text-ink-faint">
                {isZh ? personalData.education.majorZh : personalData.education.major} ·{' '}
                {isZh ? personalData.education.degreeZh : personalData.education.degree}
              </p>

              <div className="mt-6 border-t border-edge pt-5">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                  {isZh ? '主修课程' : 'Major courses'}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(isZh ? personalData.education.coursesZh : personalData.education.courses).map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="h-full rounded-2xl border border-edge bg-card p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400">
                <User className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-ink">{isZh ? '个人信息' : 'Profile'}</h2>
            </div>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs text-ink-faint">{isZh ? '姓名' : 'Name'}</dt>
                <dd className="mt-1 text-[15px] font-medium text-ink">
                  {personalData.name} · {personalData.nameZh}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-faint">{isZh ? '身份' : 'Role'}</dt>
                <dd className="mt-1 text-[15px] font-medium text-ink">{isZh ? personalData.titleZh : personalData.title}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-faint">{isZh ? '地点' : 'Location'}</dt>
                <dd className="mt-1 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink">
                  <MapPin className="h-3.5 w-3.5 text-ink-faint" />
                  {isZh ? '中国 湖北 武汉' : 'Wuhan, China'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-faint">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${personalData.contact.email}`}
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {personalData.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------- Beyond work -------------------------- */}
      <section>
        <SectionHeading
          eyebrow={isZh ? '工作之外' : 'Beyond Work'}
          title={isZh ? '不写代码的时候' : 'When I’m not coding'}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {hobbies.map((h, i) => (
            <Reveal key={h.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-edge bg-card p-6 transition-colors hover:border-edge-strong">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-card-muted text-ink-muted">
                  {h.icon}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{h.title}</h3>
                {h.items.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {h.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                )}
                {h.items.length === 0 && (
                  <p className="mt-2 text-sm text-ink-faint">
                    {h.title === (isZh ? '音乐' : 'Music')
                      ? isZh ? '歌单常驻。' : 'Always on.'
                      : isZh ? '随拍记录生活。' : 'Capturing everyday moments.'}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
