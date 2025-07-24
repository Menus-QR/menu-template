import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL environment variable');
}

if (!process.env.EXPO_PUBLIC_SUPABASE_KEY!) {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_KEY! environment variable');
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
