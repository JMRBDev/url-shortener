import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase_config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as userSignOut } from 'firebase/auth';
import { User } from '@firebase/auth';


const formatAuthUser = (user: User) => ({
    uid: user.uid,
    email: user.email
});

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setUser(null)
            setLoading(false)
            return;
        }

        setLoading(true)
        var formattedUser = formatAuthUser(authState);
        setUser(formattedUser);
        setLoading(false);
    };

    const clear = () => {
        setUser(null);
        setLoading(true);
    };

    const signIn = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const signUp = (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signOut = () =>
        userSignOut(auth).then(clear);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signIn,
        signUp,
        signOut,
    };
}

export default useUser;