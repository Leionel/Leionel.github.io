import { Fragment, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CircleX,
  Flag,
  Github,
  TerminalSquare,
  User,
} from 'lucide-react';
import projectsData from '../data/projects.json';
import caseStudies from '../data/caseStudies.json';
import personalData from '../data/personal.json';
import { useLanguage } from '../contexts/language';
import { Reveal, Tag } from '../components/ui';
import pmWorkbench from '../assets/projects/pm-workbench.jpg';
import pmIntervention from '../assets/projects/pm-intervention.jpg';
import pmDeliverables from '../assets/projects/pm-deliverables.jpg';
import pmWorkflow from '../assets/projects/pm-workflow.png';
import pmLoop from '../assets/projects/pm-loop.jpg';
import ljPoster from '../assets/projects/lj-poster.jpg';

type Bilingual = { en: string; zh: string };

type Study = {
  problem: string;
  problemZh: string;
  role: string;
  roleZh: string;
  system: string;
  systemZh: string;
  flow: string[];
  flowEn: string[];
  decisions: { alt: string; altZh: string; choice: string; choiceZh: string; why: string; whyZh: string }[];
  failures: string[];
  failuresZh: string[];
  status: string;
  statusZh: string;
};

const studies = caseStudies as unknown as Record<string, Study>;

const systemImages: Record<string, { src: string; caption: Bilingual }> = {
  projectmemo: {
    src: pmWorkflow,
    caption: {
      en: 'Agent Workflow — LLMs act as nodes; writes and control stay in the application layer.',
      zh: 'Agent Workflow：LLM 只做节点，写入与控制权都在应用层。',
    },
  },
};

const evidenceImages: Record<string, { src: string; caption: Bilingual; wide?: boolean }[]> = {
  projectmemo: [
    {
      src: pmWorkbench,
      caption: { en: 'Project workspace — deadlines, reminders, actions, readiness', zh: '项目工作台：截止状态、提醒、行动与准备度' },
    },
    {
      src: pmIntervention,
      caption: { en: 'Proactive intervention — trigger, evidence, accept / later / dismiss', zh: '主动介入：触发情境、证据说明与接受 / 稍后 / 忽略' },
    },
    {
      src: pmDeliverables,
      caption: { en: 'Deliverables room — six generated document types with versioning', zh: '成果文档室：六类成果生成与版本留存' },
      wide: true,
    },
    {
      src: pmLoop,
      caption: { en: 'Intervention–action–feedback–memory loop', zh: '主动介入—行动—反馈—记忆闭环' },
      wide: true,
    },
  ],
  'luojia-math-tutor': [
    { src: ljPoster, caption: { en: 'Project poster', zh: '项目海报' } },
  ],
};

const terminalSessions: Record<string, { title: string; lines: string[] }> = {
  'math-model-harness': {
    title: 'harness.py — CLI',
    lines: [
      'python scripts/harness.py init --project C:\\work\\math-q1 --competition cumcm --preset research',
      'python scripts/harness.py status --project C:\\work\\math-q1',
      'python scripts/harness.py prepare M1 --project C:\\work\\math-q1 --json',
      'python scripts/harness.py ai status --project C:\\work\\math-q1 --json',
      'python scripts/harness.py check M1 --project C:\\work\\math-q1 --profile research --json',
    ],
  },
};

const boundaries: Record<string, Bilingual[]> = {
  projectmemo: [
    { en: 'Xiaoyi Workflow: interface reserved only, not integrated', zh: '小艺 Workflow 仅接口预留，未接入' },
    { en: 'No OS-level background push', zh: '无 OS 级后台推送' },
    { en: 'Assignee field kept as a collaboration extension point', zh: '负责人字段保留为协作扩展位' },
  ],
};

const docParseMetrics = ['mAP', 'F1', 'BLEU', 'TEDS'];

const Section = ({ no, title, children }: { no: string; title: string; children: React.ReactNode }) => (
  <Reveal>
    <section>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs font-bold tracking-wider text-indigo-500 dark:text-indigo-400">{no}</span>
        <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  </Reveal>
);

const ProjectCase = () => {
  const { slug } = useParams();
  const { isZh } = useLanguage();

  const project = projectsData.find((p) => p.slug === slug);
  const study = slug ? studies[slug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !study) return <Navigate to="/projects" replace />;

  const idx = projectsData.findIndex((p) => p.slug === slug);
  const prev = projectsData[(idx + projectsData.length - 1) % projectsData.length];
  const next = projectsData[(idx + 1) % projectsData.length];
  const flow = isZh ? study.flow : study.flowEn;
  const sysImg = slug ? systemImages[slug] : undefined;
  const images = slug ? evidenceImages[slug] : undefined;
  const terminal = slug ? terminalSessions[slug] : undefined;
  const bounds = slug ? boundaries[slug] : undefined;

  return (
    <div className="space-y-16 md:space-y-20">
      {/* ------------------------------ Header ----------------------------- */}
      <Reveal>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {isZh ? '全部项目' : 'All projects'}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <Tag className="border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-600 dark:text-indigo-300">
            {isZh ? project.typeZh : project.type}
          </Tag>
          {project.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600 ring-1 ring-inset ring-violet-500/25 dark:text-violet-300">
              <Flag className="h-3 w-3" />
              {isZh ? project.statusZh : project.status}
            </span>
          )}
          <span className="font-mono text-xs text-ink-faint">{isZh ? project.periodZh : project.period}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isZh ? project.nameZh : project.name}
        </h1>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-ink-faint">
          <User className="h-3.5 w-3.5" />
          {isZh ? project.roleZh : project.role}
          <span className="mx-1 text-edge-strong">·</span>
          {isZh ? personalData.education.universityZh : personalData.education.university}
        </p>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
          {isZh ? project.descriptionZh : project.description}
        </p>
      </Reveal>

      {/* --------------------------- 01 Problem ---------------------------- */}
      <Section no="01" title={isZh ? '问题' : 'Problem'}>
        <p className="max-w-3xl text-[15px] leading-relaxed text-ink-muted">{isZh ? study.problemZh : study.problem}</p>
      </Section>

      {/* --------------------------- 02 My role ---------------------------- */}
      <Section no="02" title={isZh ? '我的角色' : 'My role'}>
        <p className="max-w-3xl text-[15px] leading-relaxed text-ink-muted">{isZh ? study.roleZh : study.role}</p>
      </Section>

      {/* ---------------------------- 03 System ---------------------------- */}
      <Section no="03" title={isZh ? '系统' : 'System'}>
        <p className="max-w-3xl text-[15px] leading-relaxed text-ink-muted">{isZh ? study.systemZh : study.system}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {flow.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-edge-strong" />}
              <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-card px-3.5 py-1.5 text-xs font-medium text-ink-muted">
                <span className="font-mono text-[10px] font-bold text-indigo-500 dark:text-indigo-400">{i + 1}</span>
                {step}
              </span>
            </Fragment>
          ))}
        </div>

        {sysImg && (
          <figure className="mt-8 overflow-hidden rounded-2xl border border-edge bg-card">
            <img src={sysImg.src} alt={isZh ? sysImg.caption.zh : sysImg.caption.en} loading="lazy" className="w-full object-contain" />
            <figcaption className="border-t border-edge px-5 py-3 text-xs text-ink-faint">
              {isZh ? sysImg.caption.zh : sysImg.caption.en}
            </figcaption>
          </figure>
        )}
      </Section>

      {/* ------------------------- 04 Key decisions ------------------------ */}
      <Section no="04" title={isZh ? '关键决策' : 'Key decisions'}>
        <div className="grid gap-4 lg:grid-cols-2">
          {study.decisions.map((d, i) => (
            <div key={i} className="rounded-2xl border border-edge bg-card p-6 transition-colors hover:border-edge-strong sm:p-7">
              <span className="font-mono text-xs font-bold tracking-wider text-indigo-500 dark:text-indigo-400">
                D{String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 text-[15px] font-semibold leading-snug text-ink">{isZh ? d.choiceZh : d.choice}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-faint">
                <span className="mr-1.5 font-medium">{isZh ? '备选：' : 'Instead:'}</span>
                <span className="line-through decoration-edge-strong">{isZh ? d.altZh : d.alt}</span>
              </p>
              <p className="mt-4 border-l-2 border-indigo-500/40 pl-3.5 text-sm leading-relaxed text-ink-muted">
                {isZh ? d.whyZh : d.why}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------- 05 Evidence --------------------------- */}
      <Section no="05" title={isZh ? '证据' : 'Evidence'}>
        {terminal && (
          <div className="overflow-hidden rounded-2xl border border-edge bg-zinc-950 shadow-lg shadow-zinc-950/10">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                <TerminalSquare className="h-3.5 w-3.5" />
                {terminal.title}
              </span>
            </div>
            <div className="overflow-x-auto p-5">
              {terminal.lines.map((line) => (
                <p key={line} className="whitespace-pre font-mono text-[12.5px] leading-loose text-zinc-300">
                  <span className="mr-2 select-none text-emerald-400">$</span>
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {slug === 'docparse' && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {docParseMetrics.map((m) => (
              <div key={m} className="rounded-2xl border border-edge bg-card p-5 text-center">
                <p className="font-mono text-lg font-bold text-ink">{m}</p>
                <p className="mt-1 text-xs text-ink-faint">{isZh ? '自动化评测指标' : 'Automated metric'}</p>
              </div>
            ))}
          </div>
        )}

        {images && (
          <div className={`mt-6 grid gap-5 ${images.length > 1 ? 'sm:grid-cols-2' : 'sm:max-w-md'}`}>
            {images.map((img) => (
              <figure key={img.caption.en} className={img.wide ? 'sm:col-span-2' : ''}>
                <div className="overflow-hidden rounded-2xl border border-edge bg-card">
                  <img
                    src={img.src}
                    alt={isZh ? img.caption.zh : img.caption.en}
                    loading="lazy"
                    className={
                      img.wide || images!.length === 1
                        ? 'max-h-[32rem] w-full object-contain'
                        : 'aspect-[16/10] w-full object-cover object-top'
                    }
                  />
                </div>
                <figcaption className="mt-2 text-xs leading-relaxed text-ink-faint">
                  {isZh ? img.caption.zh : img.caption.en}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>

      {/* -------------------------- 06 What failed ------------------------- */}
      <Section no="06" title={isZh ? '踩过的坑' : 'What failed'}>
        <ul className="space-y-3">
          {(isZh ? study.failuresZh : study.failures).map((f, i) => (
            <li key={i} className="flex items-start gap-3 rounded-2xl border border-edge bg-card p-5">
              <CircleX className="mt-0.5 h-4 w-4 shrink-0 text-rose-500/70 dark:text-rose-400/70" />
              <p className="text-sm leading-relaxed text-ink-muted">{f}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------- 07 Status ------------------------------ */}
      <Section no="07" title={isZh ? '当前进度' : 'Current status'}>
        <div className="rounded-2xl border border-edge bg-card-muted/60 p-6 sm:p-7">
          <p className="max-w-3xl text-[15px] leading-relaxed text-ink-muted">{isZh ? study.statusZh : study.status}</p>
          {bounds && bounds.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {bounds.map((b) => (
                <span
                  key={b.en}
                  className="inline-flex items-center rounded-full border border-edge bg-card px-3 py-1 text-xs text-ink-faint"
                >
                  {isZh ? b.zh : b.en}
                </span>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* --------------------------- 08 Links ------------------------------ */}
      <Section no="08" title={isZh ? '链接' : 'Links'}>
        <div className="flex flex-wrap items-center gap-3">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-canvas transition-all hover:opacity-85"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-edge-strong"
          >
            {isZh ? '更多项目' : 'More projects'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link
            to={`/projects/${prev.slug}`}
            className="group rounded-2xl border border-edge bg-card p-5 transition-colors hover:border-edge-strong"
          >
            <p className="flex items-center gap-1.5 text-xs text-ink-faint">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              {isZh ? '上一个' : 'Previous'}
            </p>
            <p className="mt-1.5 truncate text-[15px] font-semibold text-ink">{isZh ? prev.nameZh : prev.name}</p>
          </Link>
          <Link
            to={`/projects/${next.slug}`}
            className="group rounded-2xl border border-edge bg-card p-5 text-right transition-colors hover:border-edge-strong"
          >
            <p className="text-xs text-ink-faint">
              {isZh ? '下一个' : 'Next'}
              <ArrowRight className="ml-1.5 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </p>
            <p className="mt-1.5 truncate text-[15px] font-semibold text-ink">{isZh ? next.nameZh : next.name}</p>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default ProjectCase;
