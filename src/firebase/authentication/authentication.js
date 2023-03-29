import { auth, db } from "./../config";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    query,
    getDocs,
    collection,
    where,
    setDoc,
    doc,
} from "firebase/firestore";

export const logInWithEmailAndPassword = async ({ email, password, onSuccess }) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

        if (onSuccess) {
            onSuccess();
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async ({ name, email, password, onSuccess }) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            name,
            email,
            admin: false,
        });

        if (onSuccess) {
            onSuccess();
        }
    } catch (err) {
        console.error(err);
    }
};

export async function getUserProfile(email) {
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    const results = await getDocs(userQuery);

    if (results.size > 0) {
        const [user] = results.docs.map((item) => ({
        ...item.data(),
        id: item.id,
        }));
        return user;
    }

    return null;
};

export const logout = () => {
    signOut(auth);
};