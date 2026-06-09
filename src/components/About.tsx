import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <motion.section 
      id="about" 
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
                About Me
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-8 leading-tight">
                Crafting robust systems <br className="hidden md:block" /> from backend to frontend.
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-400 font-light text-xl leading-relaxed max-w-2xl">
               <p>
                Hello! I'm Hammad, a dynamic Senior Web Developer with 4 years of experience delivering high-impact features and driving business success. My expertise lies in designing user-friendly interfaces and enhancing robust ERP systems.
              </p>
              <p>
                I graduated second in my batch with a BSSE from the University of Sialkot, obtaining a silver medal. My proudest achievement was building a complete product suite single-handedly for my final year project.
              </p>
              <p>
                Today, I focus on applying best practices in code quality and project management, building scalable backends, and leading cross-functional teams to seamless delivery.
              </p>
            </div>

            <div className="mt-14 pt-10 border-t border-border flex flex-col sm:flex-row gap-8 sm:gap-16">
               <div>
                  <div className="text-gray-300 font-display text-sm uppercase tracking-widest mb-3">Education</div>
                  <h4 className="text-2xl font-display font-medium text-white">University of Sialkot</h4>
                  <p className="text-primary mt-1">Silver Medalist</p>
               </div>
               <div>
                  <div className="text-gray-300 font-display text-sm uppercase tracking-widest mb-3">Location</div>
                  <h4 className="text-2xl font-display font-medium text-white">Dubai, UAE</h4>
                  <p className="text-primary mt-1">Available Globally</p>
               </div>
            </div>

            <div className="mt-16">
              <a 
                href="/resume.pdf"
                download="Hammad_Resume.pdf"
                className="group inline-flex items-center space-x-6"
              >
                <div className="w-16 h-16 rounded-full border border-border flex justify-center items-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="font-display font-bold text-2xl uppercase tracking-widest text-white group-hover:text-primary transition-colors">
                  Download CV
                </span>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </motion.section>
  );
}
