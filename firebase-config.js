// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import {
  getAuth,
  GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBZs4Apl00BxSuc2IuWFOHDLvh_8dwnyGE',
  authDomain: 'mini-blog-1f44c.firebaseapp.com',
  projectId: 'mini-blog-1f44c',
  storageBucket: 'mini-blog-1f44c.firebasestorage.app',
  messagingSenderId: '272340552801',
  appId: '1:272340552801:web:219452557346d084a4ee20',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
