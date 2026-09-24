export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const token = String(req.query?.access_token || '');
  const account = String(req.query?.account || '');
  const location = String(req.query?.location || '');
  if (!token || !account || !location) return res.status(400).json({ error: 'access_token, account, dan location diperlukan.' });
  try {
    const parent = location.startsWith('locations/') ? `${account}/${location}` : `${account}/locations/${location}`;
    const url = new URL(`https://mybusiness.googleapis.com/v4/${parent}/reviews`);
    url.searchParams.set('pageSize', '50');
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || 'Gagal mengambil review Google.' });
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(502).json({ error: error?.message || 'Gagal menghubungi Google Review API.' });
  }
}
