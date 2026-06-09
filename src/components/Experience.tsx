import { motion } from 'motion/react';
import { useExperiences } from '../hooks/useExperiences';

export default function Experience() {
  const { experiences, loading } = useExperiences();

  return (
    <motion.section 
      id="experience" 
      className="py-24"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-start-5 lg:col-span-8 xl:col-start-6 xl:col-span-7 lg:pl-10">
            
            <div className="mb-14">
              <div className="flex items-center text-gray-300 font-display text-lg uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                Resume
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-4">
                Professional Experience
              </h2>
            </div>

            <div className="space-y-12">
              {loading ? (
                <p className="text-gray-400 font-display text-xl uppercase tracking-widest">Loading...</p>
              ) : experiences.length === 0 ? (
                <p className="text-gray-400 font-display text-xl uppercase tracking-widest">No experiences added yet.</p>
              ) : experiences.map((exp, index) => (
                <motion.div
                  key={exp.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="border-t border-border pt-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-2xl font-display font-semibold text-white">
                        {exp.title}
                      </h3>
                      <div className="text-gray-400 font-display text-lg mt-2 md:mt-0 uppercase tracking-wider">
                        {exp.date}
                      </div>
                    </div>
                    
                    <div className="text-primary font-display text-xl uppercase tracking-widest mb-6">
                      {exp.company} — {exp.location}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {exp.highlights.map((highlight: string, idx: number) => (
                        <li key={idx} className="flex text-gray-400 font-light text-lg leading-relaxed">
                          <span className="text-primary mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                      {exp.tech.map((tech: string) => (
                        <span key={tech} className="font-display text-sm uppercase tracking-widest text-gray-500 border border-border px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
