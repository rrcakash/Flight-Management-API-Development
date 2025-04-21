import { admin } from '../config/firebase';

export class AuthService {
  async registerUser(email: string, password: string, role: string) {
    const userRecord = await admin.auth().createUser({ email, password });
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });
    console.log(`[AuthService] Set custom role: ${role} for UID: ${userRecord.uid}`);

    return {
      uid: userRecord.uid,
      email: userRecord.email,
      role
    };
  }

  async loginUser(idToken: string) {
    const decoded = await admin.auth().verifyIdToken(idToken);
    console.log(`[AuthService] Login for UID: ${decoded.uid}, Role: ${decoded.role}`);
    return {
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role
    };
  }
}