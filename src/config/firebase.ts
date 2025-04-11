import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Dynamically load the JSON file
const serviceAccountPath = path.resolve(__dirname, '../../flight-management-api-firebase-adminsdk-fbsvc-05f5e27dc8.json');

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { admin, db };
