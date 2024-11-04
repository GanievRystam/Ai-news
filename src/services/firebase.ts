import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBIVWWqK95tDnkOUHMu2e6IvlDIH_iu5mc",
    authDomain: "ai-news-23583.firebaseapp.com",
    projectId: "ai-news-23583",
    storageBucket: "ai-news-23583.firebasestorage.app",
    messagingSenderId: "921087030354",
    appId: "1:921087030354:web:69ee2490650eed467fdb8b"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
