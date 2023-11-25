import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export async function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function minDelay<T>(promise: Promise<T>, ms: number) {
  let [p] = await Promise.all([promise, sleep(ms)]);

  return p as T;
}
