import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/language';
import projectsData from '../data/projects.json';

const Exploration = () => {
  const { isZh } = useLanguage();

  const researchInterests = [
    {
      zh: '多模态文档理解',
      en: 'Multimodal Document Understanding',
    },
    {
      zh: 'RAG 与智能体系统',
      en: 'RAG and Agent Systems',
    },
    {
      zh: '数学推理与工具调用',
      en: 'Mathematical Reasoning & Tool Calling',
    },
    {
      zh: '教育场景 AI 应用',
      en: 'AI Applications in Education',
    },
  ];

  const papers = [
    {
      zh: '基于深度学习的文档结构解析研究',
      en: 'Document Structure Parsing with Deep Learning',
    },
    {
      zh: '智能体系统在数学教育中的应用探索',
      en: 'Agent Systems for Mathematics Education',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">{isZh ? '探索' : 'Exploration'}</h1>
        <p className="text-slate-300 text-lg">
          {isZh
            ? '这里整理了我的爱好、感兴趣方向、项目实践与论文方向。'
            : 'A quick look at my hobbies, interests, projects, and papers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-primary-500/50 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '爱好' : 'Hobbies'}</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <h3 className="text-slate-200 font-medium">{isZh ? '运动' : 'Sports'}</h3>
              </div>
              <div className="flex flex-wrap gap-2 pl-5">
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-full">{isZh ? '足球' : 'Football'}</span>
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-full">{isZh ? '篮球' : 'Basketball'}</span>
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-full">F1</span>
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
        </section>

        <section className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-primary-500/50 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '感兴趣方向' : 'Research Interests'}</h2>
          <div className="space-y-4">
            {researchInterests.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{isZh ? item.zh : item.en}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-primary-500/50 transition-colors lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '项目' : 'Projects'}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projectsData.map((project) => (
              <article key={project.id} className="border border-slate-800 rounded-xl p-4 hover:border-primary-500/50 transition-colors">
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{isZh ? project.nameZh : project.name}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="px-2 py-1 bg-primary-500/10 text-primary-300 text-xs rounded-full">
                        {isZh ? project.typeZh : project.type}
                      </span>
                      <span className="text-slate-500 text-sm">{isZh ? project.periodZh : project.period}</span>
                    </div>
                    <p className="text-slate-300 text-sm mt-2 leading-relaxed">{isZh ? project.descriptionZh : project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-xs rounded-md hover:border-primary-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-primary-500/50 transition-colors lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '论文' : 'Papers'}</h2>
          <div className="space-y-4">
            {papers.map((paper, index) => (
              <div key={index} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{isZh ? paper.zh : paper.en}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Exploration;
