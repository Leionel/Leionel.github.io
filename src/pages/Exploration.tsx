import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/language';
import projectsData from '../data/projects.json';

const Exploration = () => {
  const { isZh } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">{isZh ? '探索' : 'Exploration'}</h1>
        <p className="text-slate-400 text-lg">
          {isZh ? '分享我的兴趣爱好、研究方向、项目实践和学术成果。' : 'Sharing my hobbies, research interests, project practices, and academic achievements.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 爱好模块 */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '爱好' : 'Hobbies'}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-slate-300">{isZh ? '运动' : 'Sports'}</span>
              <div className="flex flex-wrap gap-2 ml-auto">
                <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded">足球</span>
                <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded">篮球</span>
                <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded">F1</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-slate-300">{isZh ? '音乐' : 'Music'}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-slate-300">{isZh ? '拍照' : 'Photography'}</span>
            </div>
          </div>
        </div>

        {/* 感兴趣方向模块 */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '感兴趣方向' : 'Research Interests'}</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">多模态文档理解</span>
            </div>
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">智能体系统</span>
            </div>
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">机器学习算法</span>
            </div>
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">自然语言处理</span>
            </div>
          </div>
        </div>

        {/* 项目模块 */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '项目' : 'Projects'}</h2>
          <div className="space-y-4">
            {projectsData.map((project) => (
              <div key={project.id} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-medium">{isZh ? project.nameZh : project.name}</span>
                  <div className="text-slate-500 text-sm mt-1">
                    {isZh ? project.typeZh : project.type} • {isZh ? project.periodZh : project.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 论文模块 */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '论文' : 'Papers'}</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">基于深度学习的文档解析研究</span>
            </div>
            <div className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">智能体系统在数学教育中的应用</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exploration;