import personalData from '../data/personal.json';
import { GraduationCap, BookOpen, User, Calendar, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-white">About Me</h1>
        <div className="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed space-y-4">
          <p>
            I am a student at <strong>{personalData.education.university}</strong>, majoring in <strong>{personalData.education.major}</strong>. 
            My academic journey is driven by a deep fascination with the intersection of mathematics and artificial intelligence.
          </p>
          <p>
            With a solid foundation in <strong>Matrix Theory, Probability, and Statistics</strong>, I strive to bridge the gap between 
            theoretical mathematical concepts and practical engineering solutions. Currently, I am focused on 
            <strong> Multimodal Document Understanding</strong> and building intelligent agents that can reason through complex mathematical problems.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-500" />
          Education
        </h2>
        <div className="relative border-l-2 border-slate-800 ml-3 pl-8 space-y-12">
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 bg-blue-600 rounded-full border-4 border-slate-950"></div>
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">{personalData.education.university}</h3>
                <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  {personalData.education.period}
                </span>
              </div>
              <p className="text-slate-300 font-medium">{personalData.education.college}</p>
              <p className="text-slate-400">{personalData.education.major} · {personalData.education.degree}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500 pt-2">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Wuhan, China</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> GPA: {personalData.education.gpa}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Major Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personalData.education.courses.map((course, i) => (
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
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-400">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Name</p>
            <p className="text-white font-medium">{personalData.name} ({personalData.nameZh})</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Role</p>
            <p className="text-white font-medium">{personalData.title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Email</p>
            <a href={`mailto:${personalData.contact.email}`} className="text-blue-400 hover:underline">{personalData.contact.email}</a>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Location</p>
            <p className="text-white font-medium">Wuhan, Hubei, China</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
