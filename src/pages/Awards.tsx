import { Medal } from 'lucide-react';
import awardsData from '../data/awards.json';
import { useLanguage } from '../contexts/language';
import { Reveal } from '../components/ui';

const Awards = () => {
  const { isZh } = useLanguage();

  return (
    <div className="space-y-16 md:space-y-24">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
          {isZh ? '荣誉' : 'Honors'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isZh ? '奖项与成就' : 'Awards & Achievements'}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {isZh ? '数学竞赛与科研实践中的阶段性成果。' : 'Milestones from mathematical competitions and research practice.'}
        </p>
      </Reveal>

      <section className="relative">
        <div className="absolute bottom-3 left-[7px] top-3 w-px bg-edge sm:left-[9px]" aria-hidden />
        <ol className="space-y-10">
          {awardsData.map((award, i) => {
            const first = /First|一等/.test(award.award + award.awardZh);
            return (
              <li key={award.id}>
                <Reveal delay={i * 80}>
                  <div className="relative flex gap-6 sm:gap-8">
                    <span
                      className="relative z-10 mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-indigo-500 bg-canvas sm:h-5 sm:w-5"
                      aria-hidden
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    </span>

                    <div className="min-w-0 flex-1 rounded-2xl border border-edge bg-card p-6 transition-colors hover:border-edge-strong sm:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-mono text-xs text-ink-faint">{isZh ? award.dateZh : award.date}</p>
                          <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
                            {isZh ? award.nameZh : award.name}
                          </h2>
                        </div>
                        <span
                          className={
                            first
                              ? 'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-500/30'
                              : 'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-card-muted px-3.5 py-1.5 text-xs font-semibold text-ink-muted ring-1 ring-inset ring-edge'
                          }
                        >
                          <Medal className="h-3.5 w-3.5" />
                          {isZh ? award.awardZh : award.award}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};

export default Awards;
