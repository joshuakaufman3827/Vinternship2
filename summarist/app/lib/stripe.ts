import { deleteDoc, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth } from '../firebase';

// Reuses the same Firebase app your auth already uses.
export const db = getFirestore(auth.app);

export const PRICE_MONTHLY = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY ?? '';
export const PRICE_YEARLY = process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY ?? '';

export type PlanChoice = 'monthly' | 'yearly';

// DEMO CHECKOUT: no real payment happens. It saves a test subscription for the
// user in Firestore, in the same shape the Stripe extension would use, so the
// rest of the app (useSubscription) works unchanged.
// To go real later, replace the body of this function with the Stripe extension
// flow (write to customers/{uid}/checkout_sessions and redirect to the returned url).
export async function startCheckout(uid: string, choice: PlanChoice): Promise<void> {
  const price = choice === 'yearly' ? PRICE_YEARLY : PRICE_MONTHLY;
  if (!price) {
    throw new Error('Plans are not set up yet (missing price ID in .env.local).');
  }

  await setDoc(doc(db, 'customers', uid, 'subscriptions', 'demo'), {
    status: choice === 'yearly' ? 'trialing' : 'active',
    items: [{ price: { id: price } }],
    demo: true,
    created: serverTimestamp(),
    ...(choice === 'yearly' ? { trial_end: Date.now() + 7 * 24 * 60 * 60 * 1000 } : {}),
  });

  window.location.assign('/for-you');
}

export async function cancelDemoSubscription(uid: string): Promise<void> {
  await deleteDoc(doc(db, 'customers', uid, 'subscriptions', 'demo'));
}
