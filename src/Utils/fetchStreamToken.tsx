export async function fetchStreamToken(userId:any) {
  const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2YWN4YnFsYXNsc2dwbmxybWhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg0ODg2MywiZXhwIjoyMDY0NDI0ODYzfQ.qeezwQeUxgpdDMoRamwTh8DBMtxDup7GjUg5-dWvU28";

    const response = await fetch('https://avacxbqlaslsgpnlrmhp.supabase.co/functions/v1/generate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
       },
      body: JSON.stringify({ user_id: userId }),
    });
    
    const data  = await response.json();

    return data.token;
  }