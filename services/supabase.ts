
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.39.7';

const supabaseUrl = 'https://qgjgxztlkzjbjefjbtqg.supabase.co';
const supabaseKey = (typeof process !== 'undefined' ? process.env.SUPABASE_KEY : '') || 'anon-key-placeholder'; 

export const supabase = createClient(supabaseUrl, supabaseKey);

// Video Workflow: Generate Signed URL for Upload
export const getUploadUrl = async (path: string) => {
  const { data, error } = await supabase.storage
    .from('lectures')
    .createSignedUploadUrl(path);
  if (error) throw error;
  return data; // { signedUrl, path }
};

// Video Workflow: Verify Enrollment before Playback
export const checkEnrollment = async (userId: string, courseId: string) => {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();
  
  if (error || !data) return false;
  return true;
};

// Simulated Offline Storage Mapping
export const saveOfflineManifest = (lessonId: string, localPath: string) => {
  const offlineData = JSON.parse(localStorage.getItem('px_offline_vault') || '{}');
  offlineData[lessonId] = {
    localPath,
    downloadedAt: new Date().toISOString(),
    expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 day license
  };
  localStorage.setItem('px_offline_vault', JSON.stringify(offlineData));
};

export const saveUserSession = async (phone: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ 
        phone: phone, 
        last_login: new Date().toISOString(),
        name: 'Jai Sharma' 
      }, { onConflict: 'phone' })
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (err) {
    console.error('Supabase session error:', err);
    localStorage.setItem('px_user_phone', phone);
    return { phone, name: 'Jai Sharma' };
  }
};
