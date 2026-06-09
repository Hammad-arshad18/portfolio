import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle, signOut } from '../lib/firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = collection(db, 'messages');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'messages');
    });

    return () => unsubscribe();
  }, [user]);

  const seedExperiences = async () => {
    const defaultData = [
      {
        title: "Senior Web Developer",
        company: "CYBER AUTOMOTIVE SOLUTIONS",
        location: "Dubai",
        date: "January 2023 — Present",
        highlights: [
          "Led cross-functional teams through full project lifecycles, mapped sprints, and ensured on-time delivery using Agile methodologies.",
          "Designed and built RESTful APIs; integrated third-party services including Twilio, Pusher, Wazzup, Axalta, SAP, and webhooks for real-time exchange.",
          "Owned and enhanced complex ERP modules such as inventory management, roles & permissions, and estimation workflows.",
          "Built responsive, scalable, and user-friendly interfaces with Vue.js, Nuxt.js, and Vuetify."
        ],
        tech: ["Vue.js", "Nuxt.js", "APIs", "Agile", "ERP"]
      },
      {
        title: "Web Developer (Remote / Freelance)",
        company: "Siraj Tech",
        location: "Riyadh, KSA",
        date: "August 2024 — January 2025",
        highlights: [
          "Developed a multi-tenant, scalable backend system for a café mobile app using Laravel and MySQL, handling up to 1,000 concurrent users.",
          "Built RESTful APIs for table reservations, billing automation, loyalty point tracking, and user profiles.",
          "Created real-time features including live table availability and dynamic loyalty calculations using Pusher and Firebase.",
          "Deployed the backend to the cloud, ensuring reliability and modularity."
        ],
        tech: ["Laravel", "PHP", "MySQL", "Pusher", "Firebase", "RESTful APIs"]
      },
      {
        title: "Wordpress Developer (Internship)",
        company: "Patronecs",
        location: "Sialkot",
        date: "August 2022 — December 2022",
        highlights: [
          "Built real estate websites from scratch using WordPress based on given designs.",
          "Customized themes, plugins, and property listing features to meet client needs.",
          "Ensured responsive, SEO-friendly, and user-friendly website delivery."
        ],
        tech: ["WordPress", "PHP", "MySQL", "HTML", "CSS", "JavaScript"]
      }
    ];

    try {
      for (const d of defaultData) {
        await addDoc(collection(db, 'experiences'), {
          ...d,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      alert('Seeded experiences!');
    } catch(e) {
      alert('Error seeding. Check console.');
      console.error(e);
    }
  };

  const seedSkills = async () => {
    const defaultSkills = [
      {
        title: "Frontend Development",
        iconName: "Layout",
        skills: ["HTML/CSS", "JavaScript ES6", "TypeScript", "Vue.js", "Nuxt.js", "Design Implementation"]
      },
      {
        title: "Backend Development",
        iconName: "Terminal",
        skills: ["PHP", "Laravel", "Python", "Django", "API Development"]
      },
      {
        title: "Database & Cloud",
        iconName: "Database",
        skills: ["MySQL", "Server Deployment", "Docker"]
      },
      {
        title: "Tools & Integrations",
        iconName: "Cpu",
        skills: ["GIT", "API Integrations", "Payment Gateways", "ERP Development", "API Optimization"]
      }
    ];

    try {
      for (const s of defaultSkills) {
        await addDoc(collection(db, 'skills'), {
          ...s,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      alert('Seeded skills!');
    } catch(e) {
      alert('Error seeding skills. Check console.');
      console.error(e);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-surface p-8 border border-border rounded-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Admin Dashboard</h2>
          <p className="text-gray-400 mb-8">Please sign in to access the admin portal.</p>
          <button 
            onClick={signInWithGoogle}
            className="w-full py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-display font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">{user.email}</span>
          <button 
            onClick={signOut}
            className="px-4 py-2 border border-border text-white rounded-lg hover:bg-surface transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-surface p-6 border border-border rounded-xl">
          <h2 className="text-xl font-display font-bold text-white mb-6">Database Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={seedExperiences}
              className="px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded transition-colors"
            >
              Seed Experiences (Run Once)
            </button>
            <button 
              onClick={seedSkills}
              className="px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded transition-colors"
            >
              Seed Skills (Run Once)
            </button>
          </div>
        </div>

        <div className="bg-surface p-6 border border-border rounded-xl">
          <h2 className="text-xl font-display font-bold text-white mb-6">Recent Messages</h2>
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className="p-4 border border-border/50 rounded-lg bg-background/50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-medium">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-primary text-sm">{msg.email}</a>
                    </div>
                    <span className="text-xs text-gray-500">
                      {msg.createdAt?.toDate().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{msg.message}</p>
                  <button 
                    onClick={async () => {
                      if(window.confirm('Delete this message?')) {
                        try {
                          await deleteDoc(doc(db, 'messages', msg.id));
                        } catch(e) {
                          handleFirestoreError(e, OperationType.DELETE, `messages/${msg.id}`);
                        }
                      }
                    }}
                    className="text-red-400 text-xs mt-4 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
