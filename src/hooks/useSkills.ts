import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';

export function useSkills() {
  const [skillsCategories, setSkillsCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'skills'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSkillsCategories(skills);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'skills');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { skillsCategories, loading };
}
