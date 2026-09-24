import { OAuth2Client } from 'google-auth-library';

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map((part: string) => {
    const index = part.indexOf('=');
    if (index < 0) return [part.trim(), ''];
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }).filter(([key]) => key));
}

function getClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) throw new Error('Google OAuth belum dikonfigurasi.');
  return new OAuth2Client(clientId, clientSecret, redirectUri);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const cookies = parseCookies(req.headers.cookie || '');
    if (!req.query?.state || req.query.state !== cookies.ketemureview_oauth_state) {
      return res.status(400).send('OAuth state tidak valid atau sudah kedaluwarsa.');
    }
    if (req.query.error) return res.status(400).send(`Google OAuth dibatalkan: ${req.query.error}`);
    const client = getClient();
    const { tokens } = await client.getToken(String(req.query.code));
    if (!tokens.access_token) throw new Error('Google tidak mengembalikan access token.');
    return res.status(200).json({
      connected: true,
      message: 'Google OAuth berhasil. Token belum disimpan karena session/database belum tersedia.',
      hasRefreshToken: Boolean(tokens.refresh_token),
    });
  } catch (error: any) {
    console.error('Google OAuth callback error:', error);
    return res.status(500).send(error?.message || 'Google OAuth gagal.');
  }
}
