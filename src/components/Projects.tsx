import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Folder, Github, ExternalLink } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../contexts/ThemeContext';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
} from 'recharts';

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    topics: string[];
    updated_at: string;
    language: string;
}

const activityData = [
    { subject: 'Code review', val: 6 },
    { subject: 'Issues', val: 12 },
    { subject: 'Pull requests', val: 40 },
    { subject: 'Commits', val: 54 },
];

export default function Projects() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const reposPerPage = 4;
    const { theme } = useTheme();

    const GITHUB_USERNAME = 'Hammad-arshad18';

    useEffect(() => {
        const fetchGithubRepos = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
                if (!response.ok) throw new Error('Failed to fetch repositories');

                const data = await response.json();
                const filteredRepos = data.filter((repo: any) => !repo.fork);
                setRepos(filteredRepos);
            } catch (err) {
                console.error('Error fetching GitHub repos:', err);
                setError('Unable to load GitHub repositories.');
            } finally {
                setLoading(false);
            }
        };

        fetchGithubRepos();
    }, []);

    return (
        <motion.section
            id="projects"
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
                                Works
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6">
                                Real-Time Open Source
                            </h2>
                            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                                A live feed of my latest public repositories dynamically fetched directly from GitHub.
                            </p>
                        </div>

                        {loading ? (
                            <p className="text-gray-400 font-display text-xl uppercase tracking-widest col-span-full">Loading repostiros...</p>
                        ) : error ? (
                            <p className="text-red-400 font-display text-xl uppercase tracking-widest col-span-full">{error}</p>
                        ) : repos.length === 0 ? (
                            <p className="text-gray-400 font-display text-xl uppercase tracking-widest col-span-full">No public repositories found.</p>
                        ) : (
                            <div className="space-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {repos.slice((currentPage - 1) * reposPerPage, currentPage * reposPerPage).map((repo, index) => (
                                        <motion.div
                                            key={repo.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group relative flex flex-col justify-between p-8 bg-surface border border-border hover:bg-primary transition-colors duration-300"
                                        >
                                            <div className="flex justify-between items-start mb-8 relative z-10">
                                                <Folder className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                                                <div className="flex space-x-3">
                                                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white group-hover:text-white/80 transition-colors" aria-label="GitHub Repository">
                                                        <Github className="w-6 h-6" />
                                                    </a>
                                                    {repo.homepage && (
                                                        <a href={repo.homepage} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white group-hover:text-white/80 transition-colors" aria-label="Live Demo">
                                                            <ExternalLink className="w-6 h-6" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="relative z-10 flex-grow">
                                                <a href={repo.html_url} target="_blank" rel="noreferrer">
                                                    <h3 className="text-2xl font-display font-semibold text-white mb-4 group-hover:text-white transition-colors">
                                                        {repo.name}
                                                    </h3>
                                                </a>
                                                <p className="text-gray-400 font-light text-lg mb-8 group-hover:text-white/90 transition-colors line-clamp-3">
                                                    {repo.description || 'No description provided.'}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto pt-4 border-t border-border group-hover:border-white/20 relative z-10">
                                                {repo.language && <span className="font-display text-sm tracking-widest uppercase text-primary group-hover:text-white">{repo.language}</span>}
                                                {repo.topics?.slice(0, 2).map(topic => (
                                                    <span key={topic} className="font-display text-sm tracking-widest uppercase text-gray-500 group-hover:text-white/70">{topic}</span>
                                                ))}
                                            </div>

                                            <div className="absolute top-4 right-4 text-[6rem] font-display font-bold text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                                                <Folder className="w-40 h-40" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {repos.length > reposPerPage && (
                                    <div className="flex justify-center items-center mt-12 space-x-6 relative z-10">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-6 py-3 bg-surface border border-border text-white hover:bg-primary hover:border-primary transition-all font-display tracking-widest uppercase text-sm disabled:opacity-50 disabled:hover:bg-surface disabled:hover:border-border disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        <span className="font-display text-gray-400 tracking-widest text-sm">
                                            {currentPage} / {Math.ceil(repos.length / reposPerPage)}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(repos.length / reposPerPage)))}
                                            disabled={currentPage === Math.ceil(repos.length / reposPerPage)}
                                            className="px-6 py-3 bg-surface border border-border text-white hover:bg-primary hover:border-primary transition-all font-display tracking-widest uppercase text-sm disabled:opacity-50 disabled:hover:bg-surface disabled:hover:border-border disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}

                                {/* GitHub Contributions Calendar */}
                                <div className="pt-10 border-t border-border">
                                    <h3 className="text-2xl font-display font-semibold text-white mb-8">
                                        Contributions Overview
                                    </h3>
                                    <div className="flex flex-col gap-8">

                                        <div className="bg-surface p-6 lg:p-8 border border-border overflow-x-auto flex flex-col items-center">
                                            <div className="min-w-[800px] w-full mx-auto flex justify-center">
                                                <GitHubCalendar
                                                    username={GITHUB_USERNAME}
                                                    colorScheme={theme}
                                                    theme={{
                                                        light: ['#f5f5f5', '#ffedd5', '#fdba74', '#f97316', '#ea580c'],
                                                        dark: ['#111111', '#26120b', '#7c3115', '#cc420c', '#f3500f'],
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-surface p-6 lg:p-8 border border-border flex flex-col justify-center items-center h-full min-h-[400px]">
                                            <h4 className="font-display text-sm uppercase tracking-widest text-gray-400 mb-6 w-full text-left">Activity Stats</h4>
                                            <div className="w-full h-[350px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={activityData}>
                                                        <PolarGrid stroke="#262626" />
                                                        <PolarAngleAxis
                                                            dataKey="subject"
                                                            tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'Rajdhani, sans-serif' }}
                                                        />
                                                        <Radar
                                                            name="Activity"
                                                            dataKey="val"
                                                            stroke="#f3500f"
                                                            fill="#f3500f"
                                                            fillOpacity={0.4}
                                                        />
                                                    </RadarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
