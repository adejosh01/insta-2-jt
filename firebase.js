// Import the functions you need from the SDKs you need
import { initializeApp, getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK3eNXr0M1xtJ01vVFajcahC3dvMf_KR8",
  authDomain: "insta-2-jt.firebaseapp.com",
  projectId: "insta-2-jt",
  storageBucket: "insta-2-jt.appspot.com",
  messagingSenderId: "432042793704",
  appId: "1:432042793704:web:6d8e14b5af494b0ec2c75d"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage}