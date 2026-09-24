export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const token = String(req.query?.access_token || '');
  const account = String(req.query?.account || '');
  if (!token || !account) return res.status(400).json({ error: 'access_token dan account diperlukan.' });
  const pageSize = Math.min(Number(req.query?.pageSize || 100), 100);
  try {
    const url = new URL(`https://mybusinessbusinessinformation.googleapis.com/v1/${account}/locations`);
    url.searchParams.set('pageSize', String(pageSize));
    url.searchParams.set('readMask', 'name,title,storeCode,metadata');
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || 'Gagal mengambil lokasi Google Business Profile.' });
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(502).json({ error: error?.message || 'Gagal menghubungi Google Business Profile API.' });
  }
}
