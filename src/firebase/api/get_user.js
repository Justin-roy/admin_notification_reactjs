import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase_config';

const db = getFirestore(firebaseApp);

export const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};
