import admin from 'firebase-admin';

export class AuthService {
  async registerUser(email: string, password: string, role: string) {
    const userRecord = await admin.auth().createUser({ email, password });
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });
    return { uid: userRecord.uid, email, role };
  }

  async loginUser(idToken: string) {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return { uid: decoded.uid, email: decoded.email, role: decoded.role };
  }
}