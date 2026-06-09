import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const updateCounter = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        
        // Easing function for smoother animation (easeOutQuad)
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(Math.min(progress, 1));

        if (progress < 1) {
          setCount(Math.floor(end * easedProgress));
          animationFrame = requestAnimationFrame(updateCounter);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(updateCounter);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { label: 'Years of Experience', value: 4, suffix: '+' },
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Satisfied Clients', value: 30, suffix: '+' }
  ];

  return (
    <section id="stats" className="py-12 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-start-5 lg:col-span-8 xl:col-start-6 xl:col-span-7 lg:pl-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#111111] p-8 border border-border text-center sm:text-left flex flex-col justify-center transition-colors hover:bg-white/[0.02] hover:border-primary group"
                >
                  <div className="text-[3.5rem] font-display font-medium text-white leading-none mb-3 group-hover:text-primary transition-colors">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className="text-gray-400 font-display text-sm uppercase tracking-widest leading-relaxed">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
