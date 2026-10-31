'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db, PRICE_MONTHLY, PRICE_YEARLY } from '../lib/stripe';

export type Plan = 'basic' | 'premium' | 'premium-plus';

export function useSubscription(): {
  plan: Plan;
  isSubscribed: boolean;
  loading: boolean;
} {
  const { user, loading: authLoading } = useAuth();
  const [plan, setPlan] = useState<Plan>('basic');
  const [subLoading, setSubLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setPlan('basic');
      setSubLoading(false);
      return;
    }

    setSubLoading(true);
    const q = query(
      collection(db, 'customers', user.uid, 'subscriptions'),
      where('status', 'in', ['trialing', 'active'])
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          setPlan('basic');
        } else {
          const sub = snap.docs[0].data();
          const priceId: string | undefined =
            sub.items?.[0]?.price?.id ?? sub.price?.id;
          setPlan(priceId === PRICE_YEARLY ? 'premium-plus' : priceId === PRICE_MONTHLY ? 'premium' : 'premium');
        }
        setSubLoading(false);
      },
      () => {
        // If the lookup fails (rules, offline), treat as basic instead of crashing.
        setPlan('basic');
        setSubLoading(false);
      }
    );
    return unsubscribe;
  }, [user, authLoading]);

  return { plan, isSubscribed: plan !== 'basic', loading: authLoading || subLoading };
}
