import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC0TaRtjDOcQgtTB0UI2XBv4zYYbeTg3FU",
  authDomain: "lets-stream-c09e3.firebaseapp.com",
  projectId: "lets-stream-c09e3",
  storageBucket: "lets-stream-c09e3.firebasestorage.app",
  messagingSenderId: "1080273996839",
  appId: "1:1080273996839:web:919af2c7d4a6adf1f91202",
  measurementId: "G-QXQD2LG251"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);