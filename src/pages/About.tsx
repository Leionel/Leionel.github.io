import personalData from '../data/personal.json';
import { GraduationCap, BookOpen, User, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/language';

const About = () => {
  const { isZh } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-white">{isZh ? '关于我' : 'About Me'}</h1>
        <div className="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed space-y-4">
          {isZh ? (
            <>
              <p>
                我目前就读于<strong>{personalData.education.universityZh}</strong>，专业为
                <strong>{personalData.education.majorZh}</strong>。我的学习与研究兴趣聚焦在数学与人工智能的交叉方向。
              </p>
              <p>
                依托扎实的<strong>矩阵论、概率论与统计学</strong>基础，我持续探索从理论模型到工程落地的完整闭环。
                当前重点方向是<strong>多模态文档理解</strong>与可进行数学推理的智能体系统。
              </p>
            </>
          ) : (
            <>
              <p>
                I am a student at <strong>{personalData.education.university}</strong>, majoring in <strong>{personalData.education.major}</strong>.
                My academic journey is driven by a deep fascination with the intersection of mathematics and artificial intelligence.
              </p>
              <p>
                With a solid foundation in <strong>Matrix Theory, Probability, and Statistics</strong>, I strive to bridge the gap between
                theoretical mathematical concepts and practical engineering solutions. Currently, I am focused on
                <strong> Multimodal Document Understanding</strong> and building intelligent agents that can reason through complex mathematical problems.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-500" />
          {isZh ? '教育背景' : 'Education'}
        </h2>
        <div className="relative border-l-2 border-slate-800 ml-3 pl-8 space-y-12">
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 bg-blue-600 rounded-full border-4 border-slate-950"></div>
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">{personalData.education.university}</h3>
                <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  {isZh ? personalData.education.periodZh : personalData.education.period}
                </span>
              </div>
              <p className="text-slate-300 font-medium">{isZh ? personalData.education.collegeZh : personalData.education.college}</p>
              <p className="text-slate-400">
                {isZh ? personalData.education.majorZh : personalData.education.major} · {isZh ? personalData.education.degreeZh : personalData.education.degree}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500 pt-2">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {isZh ? '中国·武汉' : 'Wuhan, China'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          {isZh ? '主修课程' : 'Major Courses'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(isZh ? personalData.education.coursesZh : personalData.education.courses).map((course, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-300">{course}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-blue-500" />
          {isZh ? '个人信息' : 'Personal Information'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-400">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">{isZh ? '姓名' : 'Name'}</p>
            <p className="text-white font-medium">{personalData.name} ({personalData.nameZh})</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">{isZh ? '身份' : 'Role'}</p>
            <p className="text-white font-medium">{isZh ? personalData.titleZh : personalData.title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Email</p>
            <a href={`mailto:${personalData.contact.email}`} className="text-blue-400 hover:underline">{personalData.contact.email}</a>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">{isZh ? '地点' : 'Location'}</p>
            <p className="text-white font-medium">{isZh ? '中国 湖北 武汉' : 'Wuhan, Hubei, China'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
