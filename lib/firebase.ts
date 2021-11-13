import admin from 'firebase-admin';

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: (process.env.FIREBASE_PRIVATE_KEY).replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: '',
    });
} catch (err) {
    if (!/already exists/u.test(err.message)) {
        console.log('Firebase admin initialization error', err.stack);
    }
}

export default admin.firestore();