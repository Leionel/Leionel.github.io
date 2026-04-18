import { ArrowRight, Download, Brain, Code, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import personalData from '../data/personal.json';
import skillsData from '../data/skills.json';
import { useLanguage } from '../contexts/language';
import profilePhoto from '../assets/profile-photo.jpg';

const Home = () => {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
  const { isZh } = useLanguage();

  return (
    <div className="space-y-24">
      <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-300 text-sm font-medium mb-4 border border-primary-500/20">
            {isZh ? `你好，我是 ${personalData.nameZh}` : `Hello, I'm ${personalData.name}`}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {isZh ? (
              <>
                探索 <span className="text-primary-400">AI 与数学</span> 的边界
              </>
            ) : (
              <>
                Exploring the <span className="text-primary-400">Frontiers</span> of AI & Math.
              </>
            )}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl">{isZh ? personalData.bioZh : personalData.bio}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <Link
              to="/exploration"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all flex items-center space-x-2"
            >
              <span>{isZh ? '继续探索' : 'Explore More'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all"
            >
              {isZh ? '联系我' : 'Contact Me'}
            </Link>
            <a
              href={resumeUrl}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-primary-500/50 text-white font-semibold rounded-lg transition-all flex items-center space-x-2"
              download
            >
              <Download className="w-4 h-4" />
              <span>{isZh ? '简历' : 'Resume'}</span>
            </a>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-primary-500/30 to-secondary-500/20 rounded-full blur-3xl absolute -z-10 animate-pulse"></div>
          <div className="w-72 h-72 md:w-96 md:h-96 border border-primary-500/30 rounded-3xl overflow-hidden p-4 relative group bg-slate-900/80">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 pointer-events-none group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-colors"></div>
            <img src={profilePhoto} alt="Personal Photo" className="w-full h-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Brain className="w-8 h-8 text-primary-400" />,
            title: isZh ? '数学竞赛能力' : 'Math Expert',
            desc: isZh ? '在全国数学竞赛中获得一等奖，擅长数学建模和理论分析。' : 'First Prize in National Math Competition.',
          },
          {
            icon: <Code className="w-8 h-8 text-primary-400" />,
            title: isZh ? 'AI 系统开发' : 'AI Developer',
            desc: isZh ? '专注 RAG 与 LLM Agent 系统落地。' : 'Focus on RAG and LLM Agent systems.',
          },
          {
            icon: <Cpu className="w-8 h-8 text-primary-400" />,
            title: isZh ? '科研导向' : 'Research Focused',
            desc: isZh ? '持续参与创新训练项目，结合工程实践与学术探索。' : 'Core member of innovative training programs.',
          },
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-primary-500/50 transition-colors group">
            <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-white">{isZh ? '核心技能' : 'Core Skills'}</h2>
          <p className="text-slate-300">{isZh ? '数学理论与工程实践并重，持续构建跨学科能力。' : 'A blend of mathematical theory and engineering practice.'}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {skillsData[0].skills.concat(skillsData[1].skills).map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-slate-200 text-sm hover:text-white hover:border-primary-500/50 transition-all cursor-default"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="p-12 rounded-3xl bg-gradient-to-br from-primary-700 to-primary-500 text-center space-y-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10">{isZh ? '欢迎一起交流合作' : 'Interested in Collaboration?'}</h2>
        <p className="text-emerald-100 text-lg relative z-10 max-w-xl mx-auto">
          {isZh ? '欢迎交流 AI、数学和有趣的研究方向。' : "Let's talk about AI, Math, or interesting research opportunities."}
        </p>
        <div className="pt-4 relative z-10">
          <Link
            to="/contact"
            className="px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:shadow-xl transition-all inline-block"
          >
            {isZh ? '联系我' : 'Get In Touch'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
