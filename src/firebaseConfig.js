// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfawRog5klVCNihJUmmvHG9OZYcATHHbM",
  authDomain: "polling-website-95eaf.firebaseapp.com",
  databaseURL: "https://polling-website-95eaf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "polling-website-95eaf",
  storageBucket: "polling-website-95eaf.firebasestorage.app",
  messagingSenderId: "322667519262",
  appId: "1:322667519262:web:d0a3400340e9788ff37d0f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
