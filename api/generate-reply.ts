import { GoogleGenAI, Type } from '@google/genai';

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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    } = req.body || {};

    if (!ai) {
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
      return res.status(200).json({
        success: true,
        source: 'smart-template-engine',
        data: fallbackReplies,
      });
    }

    const systemInstruction = `Anda adalah asisten AI profesional untuk KetemuReview, platform manajemen reputasi & auto-reply ulasan Google Bisnisku terdepan di Indonesia. Buat 3 opsi balasan ulasan terstruktur dalam JSON.`;

    const prompt = `Data Ulasan Google Maps:
- Nama Bisnis: ${businessName}
- Bidang/Kategori: ${businessType}
- Nama Reviewer: ${reviewerName}
- Rating Bintang: ${rating} dari 5 Bintang
- Isi Ulasan: "${reviewText}"
- Tone: ${tone}
- Bahasa: ${language}
${customNotes ? `- Catatan: ${customNotes}` : ''}
${promotion ? `- Promo: ${promotion}` : ''}
${contactResolution ? `- Kontak Resolusi: ${contactResolution}` : ''}`;

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
                sentiment: { type: Type.STRING },
                sentimentScore: { type: Type.NUMBER },
                customerEmotion: { type: Type.STRING },
                highlightPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                actionAdvice: { type: Type.STRING },
              },
              required: ['sentiment', 'sentimentScore', 'customerEmotion', 'highlightPoints', 'actionAdvice'],
            },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  badge: { type: Type.STRING },
                  replyText: { type: Type.STRING },
                  characterCount: { type: Type.INTEGER },
                  toneFit: { type: Type.STRING },
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
    return res.status(200).json({
      success: true,
      source: 'gemini-3.8-flash',
      data: parsedData,
    });
  } catch (error: any) {
    const {
      businessName = 'Bisnis Kami',
      rating = 5,
      reviewText = '',
      reviewerName = 'Pelanggan',
      tone = 'Ramah & Hangat',
      language = 'Bahasa Indonesia',
      promotion = '',
      contactResolution = '',
    } = req.body || {};

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

    return res.status(200).json({
      success: true,
      source: 'smart-template-engine',
      data: fallback,
    });
  }
}

function generateSmartFallbackReplies(params: any) {
  const { businessName, rating, reviewText, reviewerName, promotion, contactResolution } = params;
  const isPositive = rating >= 4;
  const isNegative = rating <= 2;

  const promoSnippet = promotion ? ` Jangan lewatkan juga ${promotion} pada kunjungan Kakak berikutnya ya!` : '';
  const contactSnippet = contactResolution ? ` Mohon hubungi kami via WhatsApp di ${contactResolution} agar kami dapat memberikan solusi terbaik.` : '';

  let opt1Text = isPositive
    ? `Halo Kak ${reviewerName}, terima kasih banyak atas ulasan bintang ${rating} untuk ${businessName}! Senang sekali mendengar pengalaman menyenangkan Kakak di tempat kami.${promoSnippet} Ditunggu kedatangannya kembali ya Kak! ✨`
    : isNegative
    ? `Halo Kak ${reviewerName}, terima kasih atas ulasannya untuk ${businessName}. Kami memohon maaf sebesar-besarnya atas ketidaknyamanan yang dialami.${contactSnippet} Ulasan Kakak menjadi evaluasi penting bagi tim kami.`
    : `Halo Kak ${reviewerName}, terima kasih atas kunjungan dan review bintang 3 untuk ${businessName}. Kami akan jadikan masukan Kakak sebagai bahan evaluasi. Ditunggu kunjungan berikutnya!`;

  let opt2Text = isPositive
    ? `Terima kasih banyak Kak ${reviewerName} atas review positif dan bintang 5 untuk ${businessName}. Kami sangat senang bisa melayani Kakak dengan baik!`
    : `Yth. Kak ${reviewerName}, mohon maaf yang sedalam-dalamnya atas pengalaman kurang berkenan di ${businessName}.${contactSnippet}`;

  let opt3Text = isPositive
    ? `Hai Kak ${reviewerName}! Ulasan manis dari Kakak membuat hari kami di ${businessName} terasa lebih ceria. Kami selalu berusaha memberikan yang terbaik! 🙏`
    : `Salam hangat Kak ${reviewerName}. Kami sangat menyesal mengetahui ketidaknyamanan saat berkunjung ke ${businessName}.${contactSnippet} Kami berharap diberi kesempatan melayani lebih baik ke depan.`;

  return {
    analysis: {
      sentiment: isPositive ? 'positive' : isNegative ? 'negative' : 'neutral',
      sentimentScore: isPositive ? 95 : isNegative ? 25 : 60,
      customerEmotion: isPositive ? 'Puas & Bahagia' : isNegative ? 'Kecewa & Butuh Solusi' : 'Cukup Puas',
      highlightPoints: ['Pengalaman Pelanggan', 'Kualitas Pelayanan'],
      actionAdvice: isPositive ? 'Pertahankan standar keramahan staf.' : 'Hubungi pelanggan segera via jalur privat.',
    },
    options: [
      {
        id: 'opt-1',
        title: 'Opsi 1: Ramah, Hangat & Personal',
        badge: 'Paling Direkomendasikan',
        replyText: opt1Text,
        characterCount: opt1Text.length,
        toneFit: 'Membangun hubungan hangat dengan pelanggan.',
      },
      {
        id: 'opt-2',
        title: 'Opsi 2: Singkat, Padat & Profesional',
        badge: 'Ringkas & Cepat',
        replyText: opt2Text,
        characterCount: opt2Text.length,
        toneFit: 'Respon cepat dan to the point.',
      },
      {
        id: 'opt-3',
        title: 'Opsi 3: Detail & Solutif',
        badge: isPositive ? 'Dukungan Promo' : 'Solutif',
        replyText: opt3Text,
        characterCount: opt3Text.length,
        toneFit: 'Menunjukkan komitmen dan keterbukaan bisnis.',
      },
    ],
  };
}
