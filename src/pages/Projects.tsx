import projectsData from '../data/projects.json';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

const Projects = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">Project Portfolio</h1>
        <p className="text-slate-400 text-lg">
          Showcasing my research and engineering work in Multimodal AI and Document Understanding.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projectsData.map((project) => (
          <article
            key={project.id}
            className="p-8 md:p-12 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 text-slate-800 group-hover:text-blue-500/10 transition-colors -z-10">
              <Briefcase className="w-32 h-32" />
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                      {project.type}
                    </span>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{project.period}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-slate-400 leading-relaxed italic border-l-4 border-slate-800 pl-4 py-2">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Key Contributions</h3>
                  <ul className="space-y-3">
                    {project.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium rounded-md group-hover:border-blue-500/30 transition-colors"
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
    </div>
  );
};

export default Projects;
