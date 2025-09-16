import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

const postsDiv = document.getElementById('posts');

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

loadPosts();
