import personalData from '../data/personal.json';
import skillsData from '../data/skills.json';
import { ArrowRight, Download, Brain, Code, Cpu, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/language';

const Home = () => {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
  const { isZh } = useLanguage();

  return (
    <div className="space-y-24">
      <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            {isZh ? `你好，我是 ${personalData.nameZh}` : `Hello, I'm ${personalData.name}`}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {isZh ? (
              <>探索 AI 与数学的<span className="text-primary-500">边界</span></>
            ) : (
              <>Exploring the <span className="text-primary-500">Frontiers</span> of AI & Math.</>
            )}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl">
            {isZh ? personalData.bioZh : personalData.bio}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <Link
              to="/exploration"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all flex items-center space-x-2"
            >
              <span>{isZh ? '探索更多' : 'Explore More'}</span>
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
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 text-white font-semibold rounded-lg transition-all flex items-center space-x-2"
              download
            >
              <Download className="w-4 h-4" />
              <span>{isZh ? '简历' : 'Resume'}</span>
            </a>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl absolute -z-10 animate-pulse"></div>
          <div className="w-64 h-64 md:w-80 md:h-80 border-2 border-blue-500/30 rounded-3xl overflow-hidden p-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 pointer-events-none group-hover:from-primary-500/40 group-hover:to-secondary-500/40 transition-colors"></div>
            <div className="w-full h-full bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary-500/30">
                <img src="https://picsum.photos/seed/personal-photo/200/200.jpg" alt="Personal Photo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{personalData.name}</h3>
                <p className="text-slate-500 text-sm">{isZh ? personalData.education.universityZh : personalData.education.university}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Brain className="w-8 h-8 text-primary-500" />,
            title: isZh ? '数学能力' : 'Math Expert',
            desc: isZh ? '全国大学生数学竞赛省级一等奖。' : 'First Prize in National Math Competition.',
          },
          {
            icon: <Code className="w-8 h-8 text-primary-500" />,
            title: isZh ? 'AI 开发' : 'AI Developer',
            desc: isZh ? '专注 RAG 与智能体系统。' : 'Focus on RAG and LLM Agent systems.',
          },
          {
            icon: <Cpu className="w-8 h-8 text-primary-500" />,
            title: isZh ? '科研导向' : 'Research Focused',
            desc: isZh ? '参与多项创新训练与项目研发。' : 'Core member of innovative training programs.',
          },
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-colors group">
            <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-white">{isZh ? '核心技能' : 'Core Skills'}</h2>
          <p className="text-slate-400">{isZh ? '数理理论与工程实践的结合。' : 'A blend of mathematical theory and engineering practice.'}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {skillsData[0].skills.concat(skillsData[1].skills).map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-slate-300 text-sm hover:text-white hover:border-primary-500/50 transition-all cursor-default"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="p-12 rounded-3xl bg-gradient-to-br from-primary-600 to-secondary-700 text-center space-y-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10">
          {isZh ? '想一起合作吗？' : 'Interested in Collaboration?'}
        </h2>
        <p className="text-primary-100 text-lg relative z-10 max-w-xl mx-auto">
          {isZh ? '欢迎交流 AI、数学或有趣的科研机会。' : "Let's talk about AI, Math, or interesting research opportunities."}
        </p>
        <div className="pt-4 relative z-10">
          <Link
            to="/contact"
            className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:shadow-xl transition-all inline-block"
          >
            {isZh ? '开始联系' : 'Get In Touch'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
