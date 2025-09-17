// utils/supabaseClient.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://avacxbqlaslsgpnlrmhp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2YWN4YnFsYXNsc2dwbmxybWhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0ODg2MywiZXhwIjoyMDY0NDI0ODYzfQ.qeezwQeUxgpdDMoRamwTh8DBMtxDup7GjUg5-dWvU28';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY,{
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
});
