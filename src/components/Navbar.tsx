import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, User, Briefcase, LayoutGrid, MessageSquare, Award, Tag, Activity, Folder, Code2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Stats', href: '#stats', icon: Activity },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code2 },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Works', href: '#projects', icon: Folder },
    { name: 'Contact', href: '#contact', icon: MessageSquare }
];

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState('Home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            for (const link of [...navLinks].reverse()) {
                const id = link.href.substring(1);
                const section = document.getElementById(id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveMenu(link.name);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Left Menu Button (Like Jayden Theme) */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="w-12 h-12 bg-surface text-white border border-border flex items-center justify-center rounded hover:bg-primary transition-colors hover:border-primary shadow-lg"
                    aria-label="Open menu"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Right Floating Nav (Desktop) */}
            <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
                <ul className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <li key={link.name} className="group relative">
                            <a
                                href={link.href}
                                onClick={() => setActiveMenu(link.name)}
                                className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${activeMenu === link.name
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-border bg-surface text-gray-400 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                            </a>
                            {/* Tooltip */}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none">
                                <div className="bg-surface border border-border text-white text-xs font-semibold py-1.5 px-3 rounded shadow-lg whitespace-nowrap uppercase tracking-wider">
                                    {link.name}
                                    <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-surface border-r border-t border-border rotate-45 transform origin-center"></div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Sidebar Canvas Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] flex">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                        />

                        {/* Sidebar Content */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-80 max-w-[80vw] h-full bg-[#111111] border-r border-border flex flex-col p-8"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <div className="text-xl font-display font-medium text-white uppercase tracking-widest pl-4 relative">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></span>
                                    Menu
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-gray-400 hover:text-primary transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-4">
                                <ul className="space-y-6">
                                    {navLinks.map(link => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                onClick={(e) => {
                                                    setMobileMenuOpen(false);
                                                    setActiveMenu(link.name);
                                                }}
                                                className="flex items-center space-x-4 text-gray-400 hover:text-primary transition-colors group"
                                            >
                                                <link.icon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                                <span className="font-display text-lg uppercase tracking-wider">{link.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-8 border-t border-border mt-auto">
                                <div className="text-sm font-display font-medium text-white uppercase tracking-widest pl-4 relative mb-6">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></span>
                                    Social Network
                                </div>
                                <div className="flex flex-wrap gap-4 px-4">
                                    <a href="https://github.com/Hammad-arshad18" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">GitHub</a>
                                    <a href="https://www.linkedin.com/in/hammad-arshad18" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">LinkedIn</a>
                                    <a href="https://wa.me/971568687899" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors">WhatsApp</a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
