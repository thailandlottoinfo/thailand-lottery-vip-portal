import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bhhngmbhtfkknnnyoyno.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Yb51fP7kbMcAls8xP_ButQ_dakJl11g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);