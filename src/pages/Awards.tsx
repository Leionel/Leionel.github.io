import awardsData from '../data/awards.json';
import { Star, Trophy, Calendar, Medal } from 'lucide-react';
import { useLanguage } from '../contexts/language';

const Awards = () => {
  const { isZh } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">{isZh ? '奖项与荣誉' : 'Awards & Achievements'}</h1>
        <p className="text-slate-400 text-lg">
          {isZh ? '记录我在数学竞赛与科研实践中的阶段性成果。' : 'Recognitions of my excellence in mathematical competitions and research.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {awardsData.map((award) => (
          <div
            key={award.id}
            className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 text-slate-800 group-hover:text-blue-500/10 transition-colors -z-10">
              <Trophy className="w-24 h-24" />
            </div>

            <div className="space-y-6">
              <div className="p-3 bg-blue-500/10 rounded-2xl w-fit">
                <Medal className="w-8 h-8 text-blue-500" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>{isZh ? award.dateZh : award.date}</span>
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {isZh ? award.nameZh : award.name}
                </h2>
                <p className="text-lg font-bold text-blue-500">
                  {isZh ? award.awardZh : award.award}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{isZh ? '湖北省级奖项' : 'Hubei Provincial Level'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;
