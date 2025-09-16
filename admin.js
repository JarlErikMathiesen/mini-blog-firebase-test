import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

const form = document.getElementById('postForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    await addDoc(collection(db, 'posts'), { title, content });
    alert('Post added!');
    form.reset();
  } catch (error) {
    console.error('Error adding document: ', error);
  }
});
