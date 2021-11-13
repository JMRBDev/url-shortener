import admin from 'firebase-admin';

try {

    console.log('private key', JSON.parse(process.env.FIREBASE_PRIVATE_KEY).privateKey);

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY).privateKey,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
} catch (err) {
    if (!/already exists/u.test(err.message)) {
        console.log('Firebase admin initialization error', err.stack);
    }
}

export default admin.firestore();