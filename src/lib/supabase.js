import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gqlyxrzzqxqnmdbshxit.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxbHl4cnp6cXhxbm1kYnNoeGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NjYyMzQsImV4cCI6MjA5MzA0MjIzNH0.rCczFhAEyKDHKiaUJoSkPsPE2BL68YKOzrkNfEdCcls";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);