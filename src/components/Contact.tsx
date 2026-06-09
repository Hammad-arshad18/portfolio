import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        try {
            await addDoc(collection(db, 'messages'), {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                createdAt: serverTimestamp()
            });

            setShowToast(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setShowToast(false), 5000);
        } catch (error) {
            setErrorMsg('Failed to send message. Please try again.');
            try {
                handleFirestoreError(error, OperationType.CREATE, 'messages');
            } catch (err) {
                console.error(err);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <motion.section
            id="contact"
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
                                Contact
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6">
                                Get In Touch
                            </h2>
                            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                                I'm currently available for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi!
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-8 relative">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-border py-4 text-white font-display text-xl focus:outline-none focus:border-primary transition-all peer placeholder-transparent"
                                            placeholder="Name"
                                        />
                                        <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 font-display text-xl transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-primary peer-valid:-top-4 peer-valid:text-sm peer-valid:text-gray-400">
                                            Your Name *
                                        </label>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-border py-4 text-white font-display text-xl focus:outline-none focus:border-primary transition-all peer placeholder-transparent"
                                            placeholder="Email"
                                        />
                                        <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 font-display text-xl transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-primary peer-valid:-top-4 peer-valid:text-sm peer-valid:text-gray-400">
                                            Your Email *
                                        </label>
                                    </div>
                                    <div className="relative group">
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={1}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-border py-4 text-white font-display text-xl focus:outline-none focus:border-primary transition-all peer overflow-hidden resize-none placeholder-transparent h-auto min-h-[60px]"
                                            placeholder="Message"
                                        />
                                        <label htmlFor="message" className="absolute left-0 top-4 text-gray-500 font-display text-xl transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-primary peer-valid:-top-4 peer-valid:text-sm peer-valid:text-gray-400">
                                            Write your message... *
                                        </label>
                                    </div>
                                </div>

                                {errorMsg && (
                                    <div className="text-red-400 text-sm font-display tracking-widest mt-4">
                                        {errorMsg}
                                    </div>
                                )}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group flex items-center justify-center space-x-4 bg-transparent text-white focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                            {isSubmitting ? (
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <Send className="w-5 h-5 text-white transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            )}
                                        </span>
                                        <span className="font-display text-xl uppercase tracking-widest font-semibold ml-4 group-hover:text-primary transition-colors">
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#111111] border border-border text-white px-6 py-4 rounded shadow-2xl"
                    >
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="font-display text-sm uppercase tracking-widest">Message sent successfully!</span>
                        <button
                            onClick={() => setShowToast(false)}
                            className="ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
