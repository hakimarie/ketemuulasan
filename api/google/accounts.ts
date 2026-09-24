import { OAuth2Client } from 'google-auth-library';

function client() {
  const c = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) throw new Error('Google OAuth belum dikonfigurasi.');
  return c;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const token = String(req.query?.access_token || '');
  if (!token) return res.status(401).json({ error: 'Access token diperlukan.' });
  try {
    const response = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || 'Gagal mengambil akun Google Business Profile.' });
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(502).json({ error: error?.message || 'Gagal menghubungi Google Business Profile API.' });
  }
}
