
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_AiTrwjia7_JITn39vJ6BGH9kIlxy4fY",
  authDomain: "netflix-clone-aa72c.firebaseapp.com",
  projectId: "netflix-clone-aa72c",
  storageBucket: "netflix-clone-aa72c.firebasestorage.app",
  messagingSenderId: "194421814598",
  appId: "1:194421814598:web:9f89b2dd7cc93c37436147"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    alert(error.message);
  }
}


const login = async (email, password) => {
  try{
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    alert(error.message);
  }
}

const logout = () => {
  signOut(auth)
}

export { auth, db, signup, login, logout };