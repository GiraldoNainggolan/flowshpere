import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Kita tambahkan nilai 'fallback' (cadangan) agar Supabase tidak panik saat proses Build di Vercel
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sb_publishable_Hvcqsprw2DO0Mzn8JCC8qQ_f4vryhz7.supabase.co', 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZmFsZnJhZ3lnd21vd2xxdnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MzQyNjksImV4cCI6MjA5NjMxMDI2OX0.iXFpk0pp9S5I2LXcb_XuaLgaH9dsjsGNOG1ALcyvW5Q'
  )
}