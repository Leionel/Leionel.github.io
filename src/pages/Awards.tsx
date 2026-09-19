import { Award, Medal, Trophy } from 'lucide-react';
import awardsData from '../data/awards.json';
import { useLanguage } from '../contexts/language';
import { Reveal } from '../components/ui';
import SpotlightCard from '../components/SpotlightCard';

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
        {/* Luminous timeline stem */}
        <div
          className="absolute bottom-3 left-[9px] top-3 w-[2px] bg-gradient-to-b from-indigo-500 via-violet-500/40 to-edge sm:left-[11px]"
          aria-hidden
        />
        <ol className="space-y-8">
          {awardsData.map((award, i) => {
            const first = /First|一等/.test(award.award + award.awardZh);
            return (
              <li key={award.id}>
                <Reveal delay={i * 80}>
                  <div className="relative flex gap-6 sm:gap-8">
                    {/* Node on timeline */}
                    <span
                      className="relative z-10 mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-indigo-500 bg-canvas sm:h-6 sm:w-6 shadow-sm"
                      aria-hidden
                    >
                      {i === 0 && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                      )}
                      <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500" />
                    </span>

                    <SpotlightCard className="min-w-0 flex-1 p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-mono text-xs font-semibold text-indigo-500 dark:text-indigo-400">
                            {isZh ? award.dateZh : award.date}
                          </p>
                          <h2 className="mt-2 text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl">
                            {isZh ? award.nameZh : award.name}
                          </h2>
                        </div>
                        <span
                          className={
                            first
                              ? 'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-amber-500/25 transition-transform hover:scale-105'
                              : 'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-edge bg-card-muted/80 px-3.5 py-1.5 text-xs font-semibold text-ink-muted'
                          }
                        >
                          {first ? <Trophy className="h-3.5 w-3.5" /> : <Medal className="h-3.5 w-3.5" />}
                          {isZh ? award.awardZh : award.award}
                        </span>
                      </div>
                    </SpotlightCard>
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
