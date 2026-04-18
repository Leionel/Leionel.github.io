import projectsData from '../data/projects.json';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/language';

const Projects = () => {
  const { isZh } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">{isZh ? '项目经历' : 'Project Portfolio'}</h1>
        <p className="text-slate-400 text-lg">
          {isZh ? '展示我在多模态 AI 与文档理解方向的研究与工程实践。' : 'Showcasing my research and engineering work in Multimodal AI and Document Understanding.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 项目模块 */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '项目' : 'Projects'}</h2>
          <div className="space-y-4">
            {projectsData.map((project) => (
              <div key={project.id} className="border border-slate-800 rounded-xl p-4 hover:border-primary-500/50 transition-colors">
                <div className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{isZh ? project.nameZh : project.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full">
                        {isZh ? project.typeZh : project.type}
                      </span>
                      <span className="text-slate-500 text-sm">
                        {isZh ? project.periodZh : project.period}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      {isZh ? project.descriptionZh : project.description}
                    </p>
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
              </div>
            ))}
          </div>
        </div>

        {/* 核心贡献模块 */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-6">{isZh ? '核心贡献' : 'Key Contributions'}</h2>
          <div className="space-y-4">
            {projectsData.map((project) => (
              <div key={project.id}>
                <h4 className="text-white font-medium mb-2">{isZh ? project.nameZh : project.name}</h4>
                <ul className="space-y-2">
                  {(isZh ? project.detailsZh : project.details).map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <ChevronRight className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
