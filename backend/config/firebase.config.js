const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
    ? path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
    : path.resolve(__dirname, '../crud/servicekey.json');

if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
        `Firebase service-account key not found at ${serviceAccountPath}. ` +
        'Set FIREBASE_SERVICE_ACCOUNT_PATH in backend/.env or place the downloaded key at backend/crud/servicekey.json.'
    );
}

const firebaseConfig = require(serviceAccountPath);

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
});

console.log('Firebase connected.');
