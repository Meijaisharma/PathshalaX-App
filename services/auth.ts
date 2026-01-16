
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup,
  browserLocalPersistence,
  setPersistence,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAV2ovcGBLip2_I3_uZ9eFnsHRst5ZWIuI",
  authDomain: "jaikipaathshaala.firebaseapp.com",
  projectId: "jaikipaathshaala",
  storageBucket: "jaikipaathshaala.firebasestorage.app",
  messagingSenderId: "946006139175",
  appId: "1:946006139175:web:53aa3b09eb7ee839ff4902"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch(err => console.error("Persistence error:", err));

// Enhanced error handling with whitelisting instructions
const handleAuthError = (error: any) => {
  const hostname = window.location.hostname;
  if (error.code === 'auth/unauthorized-domain') {
    error.message = `Domain Not Authorized: Please add "${hostname}" to your Firebase Authorized Domains list.`;
  }
  return error;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    return await signInWithPopup(auth, provider);
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

export const setupRecaptcha = (container: HTMLElement) => {
  try {
    if ((window as any).recaptchaVerifier) {
      try { (window as any).recaptchaVerifier.clear(); } catch (e) {}
      (window as any).recaptchaVerifier = null;
    }

    container.innerHTML = '';
    const anchor = document.createElement('div');
    anchor.id = `recaptcha-${Date.now()}`;
    container.appendChild(anchor);

    const verifier = new RecaptchaVerifier(auth, anchor, {
      size: 'invisible',
      callback: () => console.debug('reCAPTCHA: OK'),
      'expired-callback': () => {
        if ((window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier.clear();
          (window as any).recaptchaVerifier = null;
        }
      }
    });

    (window as any).recaptchaVerifier = verifier;
    return verifier;
  } catch (error) {
    console.error("reCAPTCHA Setup Failed:", error);
    return null;
  }
};

export const sendOtpToPhone = async (phoneNumber: string, appVerifier: any) => {
  if (!appVerifier) throw new Error("Security check not initialized.");
  const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
  
  try {
    const widgetId = await appVerifier.render();
    if ((window as any).grecaptcha?.reset) {
      (window as any).grecaptcha.reset(widgetId);
    }
    return await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

export const logoutUser = async () => {
  return await signOut(auth);
};
