import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { get, getDatabase, ref } from "firebase/database";

export default async function loginHandler(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        name: userData.name,
        lastName: userData.last_name,
        email: user.email,
      }));
    } else {
      console.error("User not found in database.");
    }
    return true;
  } catch (e) {
    return false;
  }
}