import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pbzpirmnhrizzogjtihm.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBienBpcm1uaHJpenpvZ2p0aWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDMzODAsImV4cCI6MjAxMDc3OTM4MH0.yjDP_OEUsfV0rytIInlhwLOlzgp2-b_vCgqLBWFafe0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };