import admin from "firebase-admin";
import fs from "fs";
import path from "path";

try {
  const serviceAccountPath = path.resolve(
    __dirname,
    "../../flight-management-api-firebase-adminsdk-fbsvc-05f5e27dc8.json"
  );

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log(" Firebase Admin initialized successfully");

} catch (err) {
  console.error(" Failed to initialize Firebase Admin:", err);
}

const db = admin.firestore();
const auth = admin.auth()
export { admin, db, auth };
