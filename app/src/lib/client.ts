import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Kita tambahkan nilai 'fallback' (cadangan) agar Supabase tidak panik saat proses Build di Vercel
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy-url.supabase.co', 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key-sepanjang-apapun-ini-tidak-masalah'
  )
}