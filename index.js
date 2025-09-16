import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

const postsDiv = document.getElementById('posts');
const form = document.getElementById('new-post-form');

async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  postsDiv.innerHTML = ''; // clear old content before loading

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    postsDiv.innerHTML += `<article>
      <h2>${data.title}</h2>
      <p>${data.content}</p>
    </article>`;
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent page reload

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (title && content) {
    await addDoc(collection(db, 'posts'), { title, content });
    form.reset(); // clear form fields
    loadPosts(); // refresh the post list
  }
});

loadPosts();
