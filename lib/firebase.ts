import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyDP4D1V_utCsq5Yf0c1XlZ1_aaf93-mllE",
  authDomain: "nindao-calendar2.firebaseapp.com",
  projectId: "nindao-calendar2",
  storageBucket: "nindao-calendar2.appspot.com",
  messagingSenderId: "119954127943",
  appId: "1:119954127943:web:b6c5cdefbcf88a61b38562",
  measurementId: "G-RMLLBPK933"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Initialize Firebase
const analytics = getAnalytics(app);