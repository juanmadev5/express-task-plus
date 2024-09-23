import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";

export default async function loginHandler(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (e) {
    console.error("Error de inicio de sesión:", e);
    return false;
  }
}
