import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { getDatabase, ref, set } from "firebase/database";

export default async function createAccount(name: string, lastName: string, email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const db = getDatabase()

        await set(ref(db, 'users/' + user.uid), {
            email: user.email,
            last_name: lastName,
            name: name,
            tasks: []
        })

        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            name: name,
            lastName: lastName,
            email: user.email,
        }));
        return true
    } catch (e) {
        return false
    }

}