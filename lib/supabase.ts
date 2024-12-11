import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://owhcbxmdbxlchbdbgvut.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93aGNieG1kYnhsY2hiZGJndnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNjkwMTgsImV4cCI6MjA0Nzg0NTAxOH0.p3U-8bO3QX8gZL8EKFAxGOHzLWc_nqMXp4tN9aojnP0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
