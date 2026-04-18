import skillsData from '../data/skills.json';
import { Terminal, Brain, Settings, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/language';

const Skills = () => {
  const { isZh } = useLanguage();

  const getIcon = (category: string) => {
    switch (category) {
      case 'Core Tech Stack':
        return <Terminal className="w-6 h-6 text-blue-500" />;
      case 'Math & Algorithms':
        return <Brain className="w-6 h-6 text-blue-500" />;
      case 'Engineering & Tools':
        return <Settings className="w-6 h-6 text-blue-500" />;
      case 'Language & Others':
        return <Globe className="w-6 h-6 text-blue-500" />;
      default:
        return <Terminal className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">{isZh ? '技术能力' : 'Technical Skills'}</h1>
        <p className="text-slate-400 text-lg">
          {isZh ? '我的能力覆盖数理基础、深度学习工程和软件开发。' : 'My expertise spans mathematical theory, deep learning engineering, and software development.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {skillsData.map((category, i) => (
          <div key={i} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                {getIcon(category.category)}
              </div>
              <h2 className="text-2xl font-bold text-white">{isZh ? category.categoryZh : category.category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.skills.map((skill, j) => (
                <div key={j} className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-slate-300 font-medium flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                      {skill.name}
                    </span>
                    <span className="text-slate-500 text-xs font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 delay-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white italic">
          {isZh ? '“数学是科学的逻辑，代码是它的表达。”' : '"Math is the logic of science; code is its manifestation."'}
        </h2>
        <p className="text-slate-500">
          {isZh ? '持续学习，探索 AI 研究的新边界。' : 'Continuously learning and exploring new frontiers in AI research.'}
        </p>
      </div>
    </div>
  );
};

export default Skills;
