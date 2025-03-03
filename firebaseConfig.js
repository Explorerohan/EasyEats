import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_KVULLMPNbPwhRjTVi9p-nrvAGS5WLOM",
  authDomain: "easyeatsauth-4a65a.firebaseapp.com",
  projectId: "easyeatsauth-4a65a",
  storageBucket: "easyeatsauth-4a65a.firebasestorage.app",
  messagingSenderId: "51723757369",
  appId: "1:51723757369:web:1acfc0c95fc2c8ddd0eae8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};