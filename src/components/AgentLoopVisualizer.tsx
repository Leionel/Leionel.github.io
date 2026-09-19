import { useState } from 'react';
import { Bot, CheckCircle2, Code2, Database, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/language';
import SpotlightCard from './SpotlightCard';

const steps = [
  {
    id: 'plan',
    icon: <Bot className="h-4 w-4" />,
    nameZh: '任务分解',
    nameEn: 'Task Decompose',
    codeSnippet: 'agent.plan(goal="证明不等式并在有限域求解")',
    badgeZh: 'DAG 任务编排',
    badgeEn: 'DAG Orchestration',
    descZh: '将宏观任务解构成拓扑依赖的微步骤，避免单步幻觉。',
    descEn: 'Decomposes macro goals into DAGs with strict dependencies.',
  },
  {
    id: 'retrieve',
    icon: <Database className="h-4 w-4" />,
    nameZh: '证据检索',
    nameEn: 'Evidence Recall',
    codeSnippet: 'retriever.query(context="CUMCM_2025_M1", top_k=3)',
    badgeZh: '混合召回 / 事实锚定',
    badgeEn: 'Hybrid Retrieval',
    descZh: '关键词与向量混合召回，所有主张均有证据卡片可溯源。',
    descEn: 'Hybrid dense + sparse retrieval with citation grounding.',
  },
  {
    id: 'execute',
    icon: <Code2 className="h-4 w-4" />,
    nameZh: '沙箱计算',
    nameEn: 'Tool Execution',
    codeSnippet: 'sandbox.run(tool="sympy", expr="solve(det(A - lambda*I) == 0)")',
    badgeZh: 'Python / SymPy 验证',
    badgeEn: 'Sandboxed Python/SymPy',
    descZh: '拒绝符号幻觉，数学命题交由精确的数值计算与符号推导求解。',
    descEn: 'Executes mathematical reasoning in sandboxed deterministic Python.',
  },
  {
    id: 'gate',
    icon: <ShieldCheck className="h-4 w-4" />,
    nameZh: '门禁核验',
    nameEn: 'Verification Gate',
    codeSnippet: 'harness.check_gate(milestone="M1", compliance="Strict")',
    badgeZh: '人工确认 / 阻断未验',
    badgeEn: 'Gate Passed (100%)',
    descZh: '不可信操作被 Gate 阻断，需人类确认；保留审计台账。',
    descEn: 'Halts untrusted side-effects; human-in-the-loop review required.',
  },
  {
    id: 'deliver',
    icon: <CheckCircle2 className="h-4 w-4" />,
    nameZh: '闭环交付',
    nameEn: 'Auditable Output',
    codeSnippet: 'generator.export(artifacts=["paper.pdf", "code.py", "audit.json"])',
    badgeZh: '可审计工件包',
    badgeEn: 'Reproducible Artifacts',
    descZh: '全生命周期版本留存，确定性结果复现与一键交付。',
    descEn: 'Generates reproducible papers, code, and transparent audit logs.',
  },
];

export default function AgentLoopVisualizer() {
  const { isZh } = useLanguage();
  const [activeStep, setActiveStep] = useState(2); // default on Tool Execution

  const current = steps[activeStep];

  return (
    <SpotlightCard className="overflow-hidden rounded-3xl border border-edge/80 p-6 sm:p-9 shadow-lg shadow-indigo-500/5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge/60 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-500 dark:text-indigo-400">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-[15px] font-bold tracking-tight text-ink">
              {isZh ? '可靠智能体 Harness 运行链路' : 'Reliable Agent Harness Loop'}
            </h3>
            <p className="text-xs text-ink-faint">
              {isZh ? '点击节点探索可验证闭环' : 'Click nodes to inspect verification steps'}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Harness Active
        </span>
      </div>

      {/* Interactive Step Navigator */}
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {steps.map((s, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(idx)}
              className={`group flex items-center gap-2 rounded-xl p-2.5 text-left transition-all duration-200 ${
                isActive
                  ? 'border border-indigo-500/40 bg-indigo-500/10 text-ink shadow-sm'
                  : 'border border-edge/50 bg-card hover:border-edge-strong hover:bg-card-muted/50 text-ink-muted'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-500 text-white'
                    : 'bg-card-muted text-ink-faint group-hover:text-ink'
                }`}
              >
                {s.icon}
              </span>
              <div className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  0{idx + 1}
                </span>
                <span className="block truncate text-xs font-semibold">
                  {isZh ? s.nameZh : s.nameEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Details Panel */}
      <div className="mt-6 rounded-2xl border border-edge/80 bg-zinc-950 p-5 sm:p-6 text-zinc-200">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
              {isZh ? current.nameZh : current.nameEn}
            </span>
          </div>
          <span className="rounded-full bg-indigo-500/20 px-3 py-1 font-mono text-xs font-semibold text-indigo-300 border border-indigo-500/30">
            {isZh ? current.badgeZh : current.badgeEn}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          {isZh ? current.descZh : current.descEn}
        </p>

        {/* Code Snippet */}
        <div className="mt-4 rounded-xl border border-white/10 bg-black/50 p-3.5 font-mono text-xs text-emerald-400 overflow-x-auto">
          <span className="mr-2 select-none text-zinc-600">&gt;&gt;&gt;</span>
          {current.codeSnippet}
        </div>
      </div>
    </SpotlightCard>
  );
}
