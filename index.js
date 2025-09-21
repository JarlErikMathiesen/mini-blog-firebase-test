import { db, auth, provider } from './firebase-config.js';
import {
  collection,
  getDocs,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';

const postsDiv = document.getElementById('posts');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const postForm = document.getElementById('postForm');
const publishBtn = document.getElementById('publishBtn');

// Load posts
async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  postsDiv.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    postsDiv.innerHTML += `<article>
      <h2>${data.title}</h2>
      <p>${data.content}</p>
    </article>`;
  });
}

// Auth events
loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider).catch((err) => console.error(err));
});

logoutBtn.addEventListener('click', () => {
  signOut(auth);
});

// Watch auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    postForm.style.display = 'block';
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    postForm.style.display = 'none';
  }
});

// Publish post
publishBtn.addEventListener('click', async () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (title && content) {
    await addDoc(collection(db, 'posts'), {
      title,
      content,
      author: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      createdAt: new Date(),
    });
    loadPosts();
  }
});

// Initial load
loadPosts();
