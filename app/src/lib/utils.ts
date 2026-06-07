import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fungsi utilitas untuk menggabungkan class Tailwind secara dinamis
 * tanpa terjadi konflik (resolves Tailwind class conflicts).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}