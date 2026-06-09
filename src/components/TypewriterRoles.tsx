import { useState, useEffect } from 'react';

const roles = [
  'Team Lead',
  'PHP, Laravel, Vue.js, Nuxt, TypeScript, Flutter, Python, Javascript',
  'ERP Architect',
  'API & Payment Integration',
  'Pixel-Perfect UI',
  'MySQL Expert'
];

export default function TypewriterRoles() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[index % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    let timer: any;

    if (!isDeleting && text === currentRole) {
      // Pause at the end of typing
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setIndex((prev) => prev + 1);
    } else {
      timer = setTimeout(() => {
        setText((prev) => 
          isDeleting 
            ? currentRole.substring(0, prev.length - 1) 
            : currentRole.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <>
      {text}
      <span className="animate-pulse font-light text-white/60 ml-0.5">|</span>
    </>
  );
}
