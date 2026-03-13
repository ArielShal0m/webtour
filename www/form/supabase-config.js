(function () {
  window.FORM_SUPABASE = {
    url: '',
    anonKey: ''
  };
  if (window.FORM_SUPABASE.url && window.FORM_SUPABASE.anonKey && typeof window.supabase !== 'undefined') {
    try {
      window.FORM_SUPABASE.client = window.supabase.createClient(
        window.FORM_SUPABASE.url,
        window.FORM_SUPABASE.anonKey
      );
    } catch (e) {
      console.warn('Supabase client not available:', e);
    }
  }
})();
