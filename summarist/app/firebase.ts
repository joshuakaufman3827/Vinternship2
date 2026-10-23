// summarist/app/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCw007GzB0jNXU3xESTnuId4LvGRzbF9lo",
  authDomain: "summarist-e5439.firebaseapp.com",
  projectId: "summarist-e5439",
  storageBucket: "summarist-e5439.firebasestorage.app",
  messagingSenderId: "summarist-e5439.firebasestorage.app",
  appId: "1:333434638771:web:2d2e4899cf876db7993bc6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
