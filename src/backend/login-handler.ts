import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { get, getDatabase, ref } from "firebase/database";

export default async function loginHandler(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const db = getDatabase();
    const userRef = ref(db, "users/" + user.uid);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();

      if (userData.email === email) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            name: userData.name,
            lastName: userData.last_name,
            email: user.email,
            tasks: userData.tasks || [],
          })
        );
        return true;
      } else {
        console.info("Email does not match the database entry.");
        return false;
      }
    } else {
      console.info("User not found in database.");
      return false;
    }
  } catch (e) {
    console.info("Error during login:", e);
    return false;
  }
}
