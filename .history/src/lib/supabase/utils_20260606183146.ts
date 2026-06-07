import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines standard class names with Tailwind classes safely,
 * resolving any conflicts (e.g., px-2 and px-4 resolves to px-4).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}