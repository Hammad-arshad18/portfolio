import { motion } from 'motion/react';
import { 
  Code2, 
  Terminal, 
  Database, 
  Layout, 
  Layers, 
  Smartphone,
  Cpu,
  Globe
} from 'lucide-react';
import { useSkills } from '../hooks/useSkills';

export default function Skills() {
  const { skillsCategories, loading } = useSkills();

  // Helper to map icon names to actual Lucide components
  const renderIcon = (iconName: string) => {
    const props = { className: "w-8 h-8 text-primary group-hover:text-white transition-colors" };
    switch(iconName) {
      case 'Layout': return <Layout {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Code2': return <Code2 {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      default: return <Code2 {...props} />;
    }
  };

  return (
    <motion.section 
      id="skills" 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-start-5 lg:col-span-8 xl:col-start-6 xl:col-span-7 lg:pl-10">
            
            <div className="mb-14">
              <div className="flex items-center text-gray-300 font-display text-lg uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                Services
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6">
                Technical Expertise
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                A comprehensive overview of the tools, languages, and frameworks I use to build robust, scalable applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <p className="text-gray-400 font-display text-xl uppercase tracking-widest col-span-full">Loading...</p>
              ) : skillsCategories.length === 0 ? (
                <p className="text-gray-400 font-display text-xl uppercase tracking-widest col-span-full">No skills added yet.</p>
              ) : skillsCategories.map((category, index) => (
                <motion.div
                  key={category.id || category.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-surface p-8 border border-border group hover:bg-primary transition-colors duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center mb-8 relative z-10">
                    <div className="mr-6">
                      {renderIcon(category.iconName)}
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-white group-hover:text-white transition-colors">{category.title}</h3>
                  </div>
                  
                  <ul className="space-y-3 relative z-10">
                    {category.skills?.map((skill: string) => (
                      <li key={skill} className="flex text-gray-400 font-light text-lg group-hover:text-white/90 transition-colors">
                        <span className="text-primary group-hover:text-white mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 transition-colors"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hover background numeric decoration */}
                  <div className="absolute -bottom-6 -right-6 text-[8rem] font-display font-bold text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                    0{index + 1}
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
