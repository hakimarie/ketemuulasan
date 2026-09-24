import { OAuth2Client } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/business.manage'];

function getClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Google OAuth belum dikonfigurasi. Isi GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, dan GOOGLE_REDIRECT_URI.');
  }
  return new OAuth2Client(clientId, clientSecret, redirectUri);
}

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const client = getClient();
    const state = crypto.randomUUID();
    const url = client.generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: SCOPES, state });
    res.setHeader('Set-Cookie', [
      `ketemureview_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    ]);
    return res.redirect(url);
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Google OAuth belum siap.' });
  }
}
