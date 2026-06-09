import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import hammadPhoto from '../assets/hammad-professional.jpg';


export default function Hero() {
    const [time, setTime] = useState(() => {
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'Asia/Dubai',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date());
    });

    useEffect(() => {
        const updateTime = () => {
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Dubai',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
        };

        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center py-24 overflow-hidden">

            {/* Jayden Theme Background Canvas replacement */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]"></div>
            </div>

            {/* Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-12 gap-6 items-center">

                    <div className="col-span-12 lg:col-span-4 xl:col-span-5 relative mb-12 lg:mb-0">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-lg border border-border group"
                        >
                            <div className="absolute inset-0 transition-colors duration-500 z-10 
                                mix-blend-overlay"></div>
                            {/* Replace src with your uploaded image path */}
                            <img
                                src={hammadPhoto}
                                alt="Hammad Arshad"
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                        </motion.div>
                    </div>

                    <div className="col-span-12 lg:col-span-8 xl:col-span-7 lg:pl-10">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Info text */}
                            <div className="text-gray-400 font-display text-xl uppercase tracking-wide mb-14">
                                Dubai, UAE {time}
                            </div>

                            <div className="mb-12">
                                <div className="flex items-center text-gray-300 font-display text-lg uppercase tracking-widest mb-6">
                                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                                    Introduction
                                </div>
                                <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-display font-medium text-white leading-[1.1] mb-8">
                                    Building Robust & <br className="hidden lg:block" /> Scalable Web Solutions
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
                                    Dynamic Senior Web Developer with extensive experience in architecting digital solutions. It's a passion for scalable code, pure and simple.
                                </p>
                            </div>

                            {/* Indicators / Tags */}
                            <div className="pt-8 border-t border-white/10 mt-10">
                                <ul className="flex flex-wrap gap-x-8 gap-y-4 mb-4">
                                    {['PHP & Laravel', 'Vue.js & Nuxt.js', 'API Integration', 'ERP Development'].map((tag) => (
                                        <li key={tag}>
                                            <span className="text-gray-300 text-lg hover:text-primary transition-colors cursor-pointer border-b border-transparent hover:border-primary pb-1">
                                                {tag}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
