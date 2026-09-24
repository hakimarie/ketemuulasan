import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// AI Review Reply Generation endpoint
app.post('/api/generate-reply', async (req, res) => {
  try {
    const {
      businessName = 'Bisnis Kami',
      businessType = 'Kuliner / Cafe',
      rating = 5,
      reviewText = 'Pelayanan sangat bagus dan ramah!',
      reviewerName = 'Pelanggan',
      tone = 'Ramah & Hangat',
      language = 'Bahasa Indonesia',
      customNotes = '',
      promotion = '',
      contactResolution = '',
    } = req.body;

    if (!ai) {
      // Smart localized fallback if API key is not yet set
      const fallbackReplies = generateSmartFallbackReplies({
        businessName,
        rating,
        reviewText,
        reviewerName,
        tone,
        language,
        promotion,
        contactResolution,
      });
      return res.json({
        success: true,
        source: 'smart-template-engine',
        data: fallbackReplies,
      });
    }

    const systemInstruction = `Anda adalah asisten AI profesional untuk KetemuReview, platform manajemen reputasi & auto-reply ulasan Google Bisnisku (Google Business Profile & Google Maps) terdepan di Indonesia.
Tugas Anda adalah membuat 3 variasi balasan ulasan pelanggan yang sangat kontekstual, manusiawi (bukan terdengar seperti bot kaku), empatik, dan efektif untuk meningkatkan reputasi bisnis serta optimasi Local SEO Google Maps.

Panduan Balasan:
1. Jika ulasan bintang 5 atau 4 (positif):
   - Ucapkan terima kasih dengan hangat dan sebut nama reviewer (${reviewerName}).
   - Sebut nama bisnis (${businessName}) secara natural untuk SEO Google Maps.
   - Singgung secara spesifik hal yang dipuji reviewer dalam ulasannya.
   - Tambahkan ajakan berkunjung kembali atau info promo/menu baru jika disediakan.
2. Jika ulasan bintang 1, 2, atau 3 (netral/negatif/komplain):
   - Minta maaf dengan tulus dan penuh empati atas ketidaknyamanan yang dialami.
   - Jangan menyalahkan pelanggan atau berdebat.
   - Jelaskan bahwa masukan mereka sangat berharga untuk evaluasi tim.
   - Sediakan jalur resolusi privat (seperti nomor WhatsApp customer service/manajer) agar komplain bisa diselesaikan secara tuntas di luar Google Maps.
3. Selalu perhatikan nada bicara (tone) yang diminta: ${tone}.
4. Sesuaikan bahasa yang diminta: ${language} (jika Bahasa Indonesia gunakan bahasa santun/ramah; jika Jawa/Sunda gunakan padanan bahasa daerah yang luwes dan sopan; jika English gunakan natural English).
5. Buat 3 opsi variasi balasan:
   - Opsi 1: Ramah, Hangat & Personal (Menyentuh perasaan & apresiatif)
   - Opsi 2: Singkat, Padat & Profesional (Cocok untuk respon cepat)
   - Opsi 3: Detail & Solutif / Disertai Sentuhan Promotif`;

    const prompt = `Data Ulasan Google Maps:
- Nama Bisnis: ${businessName}
- Bidang/Kategori: ${businessType}
- Nama Reviewer: ${reviewerName}
- Rating Bintang: ${rating} dari 5 Bintang
- Isi Ulasan Pelanggan: "${reviewText}"
- Tone yang Diminta: ${tone}
- Bahasa: ${language}
${customNotes ? `- Catatan Khusus Pemilik: ${customNotes}` : ''}
${promotion ? `- Info Promo/Menu Unggulan yang Ingin Disisipkan: ${promotion}` : ''}
${contactResolution ? `- Kontak Resolusi Komplain (WA/Email): ${contactResolution}` : ''}

Berikan respons terstruktur dalam format JSON dengan list 3 opsi balasan dan analisis sentimen singkat.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.OBJECT,
              properties: {
                sentiment: { type: Type.STRING, description: 'positive, neutral, or negative' },
                sentimentScore: { type: Type.NUMBER, description: 'Score between 0 to 100' },
                customerEmotion: { type: Type.STRING, description: 'Emosi utama pelanggan, e.g. Puas, Senang, Kecewa, Frustrasi' },
                highlightPoints: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Poin utama yang disorot oleh pelanggan',
                },
                actionAdvice: { type: Type.STRING, description: 'Saran tindakan perbaikan atau follow-up untuk pemilik bisnis' },
              },
              required: ['sentiment', 'sentimentScore', 'customerEmotion', 'highlightPoints', 'actionAdvice'],
            },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING, description: 'Judul opsi, e.g. Opsi 1: Ramah & Personal' },
                  badge: { type: Type.STRING, description: 'Badge singkat e.g. Paling Direkomendasikan, Ringkas, Solutif' },
                  replyText: { type: Type.STRING, description: 'Teks balasan lengkap siap salin' },
                  characterCount: { type: Type.INTEGER },
                  toneFit: { type: Type.STRING, description: 'Alasan opsi ini cocok' },
                },
                required: ['id', 'title', 'badge', 'replyText', 'characterCount', 'toneFit'],
              },
            },
          },
          required: ['analysis', 'options'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating reply:', error);
    // Graceful fallback
    const {
      businessName = 'Bisnis Kami',
      rating = 5,
      reviewText = '',
      reviewerName = 'Pelanggan',
      tone = 'Ramah & Hangat',
      language = 'Bahasa Indonesia',
      promotion = '',
      contactResolution = '',
    } = req.body;

    const fallback = generateSmartFallbackReplies({
      businessName,
      rating,
      reviewText,
      reviewerName,
      tone,
      language,
      promotion,
      contactResolution,
    });

    return res.json({
      success: true,
      source: 'smart-template-engine',
      data: fallback,
      note: 'Dihasilkan melalui engine fallback lokal cerdas',
    });
  }
});

// Helper for smart Indonesian replies
function generateSmartFallbackReplies(params: {
  businessName: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  tone: string;
  language: string;
  promotion: string;
  contactResolution: string;
}) {
  const { businessName, rating, reviewText, reviewerName, tone, promotion, contactResolution } = params;
  const isPositive = rating >= 4;
  const isNegative = rating <= 2;

  let sentiment = isPositive ? 'positive' : isNegative ? 'negative' : 'neutral';
  let sentimentScore = isPositive ? 95 : isNegative ? 25 : 60;
  let customerEmotion = isPositive ? 'Sangat Puas & Bahagia' : isNegative ? 'Kecewa & Membutuhkan Solusi' : 'Cukup Puas dengan Catatan';

  let highlightPoints = [];
  if (reviewText.toLowerCase().includes('makanan') || reviewText.toLowerCase().includes('menu') || reviewText.toLowerCase().includes('rasa')) {
    highlightPoints.push('Kualitas Makanan & Cita Rasa');
  }
  if (reviewText.toLowerCase().includes('pelayanan') || reviewText.toLowerCase().includes('staf') || reviewText.toLowerCase().includes('ramah')) {
    highlightPoints.push('Keramahan & Sikap Pelayanan Tim');
  }
  if (reviewText.toLowerCase().includes('tempat') || reviewText.toLowerCase().includes('suasana') || reviewText.toLowerCase().includes('cozy') || reviewText.toLowerCase().includes('bersih')) {
    highlightPoints.push('Suasana dan Kenyamanan Lokasi');
  }
  if (highlightPoints.length === 0) {
    highlightPoints.push(isPositive ? 'Pengalaman Menyenangkan Secara Keseluruhan' : 'Kritik Pelayanan yang Perlu Dibenahi');
  }

  const promoSnippet = promotion ? ` Jangan lewatkan juga ${promotion} pada kunjungan Kakak berikutnya ya!` : '';
  const contactSnippet = contactResolution ? ` Kami sangat ingin mendengar detail kendala Kakak secara langsung agar dapat kami berikan solusi terbaik. Mohon hubungi manajer operasional kami via WhatsApp di ${contactResolution}.` : ' Mohon berkenan menghubungi tim kami melalui pesan langsung agar kami dapat memberikan solusi terbaik.';

  let opt1Text = '';
  let opt2Text = '';
  let opt3Text = '';

  if (isPositive) {
    opt1Text = `Halo Kak ${reviewerName}, terima kasih banyak telah berkunjung dan memberikan ulasan bintang ${rating} untuk ${businessName}! Senang sekali mendengar pengalaman menyenangkan Kakak di tempat kami. Kepuasan Kakak adalah motivasi terbesar bagi seluruh tim kami untuk selalu memberikan yang terbaik.${promoSnippet} Ditunggu kedatangannya kembali ya Kak! Salam hangat dari kami semua ✨`;
    opt2Text = `Terima kasih banyak Kak ${reviewerName} atas ulasan positif dan bintang 5 untuk ${businessName}. Kami sangat senang bisa melayani Kakak dengan baik. Sampai jumpa di kunjungan berikutnya!`;
    opt3Text = `Hai Kak ${reviewerName}! Ulasan manis dari Kakak benar-benar membuat hari kami di ${businessName} terasa lebih ceria. Kami senantiasa berkomitmen menjaga kualitas produk dan keramahan staf.${promoSnippet} Semoga hari Kakak menyenangkan dan kami tunggu kedatangannya lagi bersama keluarga/teman! 🙏`;
  } else if (isNegative) {
    opt1Text = `Halo Kak ${reviewerName}, terima kasih telah menyempatkan waktu untuk menuliskan ulasan mengenai pengalaman Kakak di ${businessName}. Pertama-tama, kami memohon maaf yang sebesar-besarnya atas ketidaknyamanan yang Kakak alami. Hal ini tentu jauh dari standar pelayanan yang selalu kami jaga.${contactSnippet} Ulasan Kakak sudah kami sampaikan ke pimpinan tim untuk evaluasi ketat hari ini juga. Terima kasih atas koreksinya demi kebaikan kami ke depan.`;
    opt2Text = `Yth. Kak ${reviewerName}, mohon maaf yang sedalam-dalamnya atas pengalaman yang kurang memuaskan di ${businessName}. Kritik Kakak adalah catatan penting bagi perbaikan operasional kami.${contactSnippet} Terima kasih atas masukan berharganya.`;
    opt3Text = `Salam hangat Kak ${reviewerName}. Kami sangat menyesal mengetahui ketidaknyamanan yang terjadi saat berkunjung ke ${businessName}. Kami sangat menghargai kejujuran Kakak karena ini membantu kami terus berbenah.${contactSnippet} Kami berharap diberi kesempatan untuk melayani Kakak dengan jauh lebih baik di masa mendatang.`;
  } else {
    opt1Text = `Halo Kak ${reviewerName}, terima kasih atas kunjungan dan penilaian bintang 3 untuk ${businessName}. Kami sangat mengapresiasi masukan yang Kakak berikan terkait kenyamanan dan pelayanan kami. Catatan ini akan menjadi bahan evaluasi agar pelayanan kami bisa meningkat menjadi bintang 5 di kunjungan Kakak berikutnya. Sukses selalu untuk Kakak!`;
    opt2Text = `Terima kasih Kak ${reviewerName} atas kunjungannya ke ${businessName} dan ulasan berharganya. Kami terus berupaya meningkatkan kualitas agar kunjungan berikutnya bisa lebih memuaskan.`;
    opt3Text = `Hai Kak ${reviewerName}, terima kasih atas review dan sarannya untuk ${businessName}. Masukan Kakak sangat kami butuhkan untuk penyempurnaan fasilitas dan layanan kami.${promoSnippet} Semoga di kesempatan berikutnya kami dapat memberikan pengalaman yang sempurna!`;
  }

  return {
    analysis: {
      sentiment,
      sentimentScore,
      customerEmotion,
      highlightPoints,
      actionAdvice: isPositive
        ? 'Pertahankan standar kebersihan dan keramahan staf, serta pertimbangkan memberikan program loyalty atau diskon repeat customer.'
        : isNegative
        ? 'Segera hubungi reviewer melalui kontak resolusi dalam waktu maksimal 2 jam untuk meredakan ketegangan dan tawarkan voucher kompensasi jika diperlukan.'
        : 'Cari tahu titik temu ketidakpuasan parsial pelanggan dan lakukan briefing singkat ke tim shift terkait.',
    },
    options: [
      {
        id: 'opt-1',
        title: 'Opsi 1: Ramah, Hangat & Personal',
        badge: 'Paling Direkomendasikan',
        replyText: opt1Text,
        characterCount: opt1Text.length,
        toneFit: 'Membangun ikatan emosional yang kuat dengan reviewer dan menyebut brand untuk SEO.',
      },
      {
        id: 'opt-2',
        title: 'Opsi 2: Singkat, Padat & Profesional',
        badge: 'Cepat & Ringkas',
        replyText: opt2Text,
        characterCount: opt2Text.length,
        toneFit: 'Efektif untuk respon cepat tanpa basa-basi namun tetap sopan.',
      },
      {
        id: 'opt-3',
        title: 'Opsi 3: Detail, Apresiatif & Solutif',
        badge: isPositive ? 'Dukungan Promo' : 'Solutif & Empati',
        replyText: opt3Text,
        characterCount: opt3Text.length,
        toneFit: 'Memberikan konteks evaluasi yang matang dan memperkuat citra keterbukaan bisnis.',
      },
    ],
  };
}

// In development, hook up Vite middleware
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // In production, serve dist
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server KetemuReview running on http://0.0.0.0:${port}`);
});
