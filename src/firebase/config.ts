// This file is intentionally left blank. 
// The firebase-config will be populated by the backend.
import { FirebaseOptions } from 'firebase/app';

export const firebaseConfig: FirebaseOptions = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}'
);
