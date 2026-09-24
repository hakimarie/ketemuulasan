import { GenerateReplyResult } from '../types';

export interface GenerateReplyRequestPayload {
  businessName: string;
  businessType: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  tone: string;
  language: string;
  customNotes?: string;
  promotion?: string;
  contactResolution?: string;
}

export async function requestAiReply(payload: GenerateReplyRequestPayload): Promise<GenerateReplyResult> {
  try {
    const res = await fetch('/api/generate-reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.error || `Server error (${res.status})`);
    }
    if (data && data.data && data.data.options && data.data.analysis) {
      return data.data as GenerateReplyResult;
    }
    throw new Error(data?.error || 'Format balasan server tidak sesuai');
  } catch (error) {
    throw error instanceof Error ? error : new Error('Gagal menghubungi layanan AI.');
  }
}

// Client-side instant generator fallback in case server is unreachable
function getLocalClientFallback(payload: GenerateReplyRequestPayload): GenerateReplyResult {
  const { businessName, rating, reviewText, reviewerName, promotion, contactResolution } = payload;
  const isPositive = rating >= 4;
  const isNegative = rating <= 2;

  const sentiment = isPositive ? 'positive' : isNegative ? 'negative' : 'neutral';
  const sentimentScore = isPositive ? 96 : isNegative ? 20 : 65;
  const customerEmotion = isPositive ? 'Puas & Bersemangat' : isNegative ? 'Kecewa & Butuh Solusi' : 'Cukup Terkesan';

  const promoTxt = promotion ? ` Jangan lewatkan juga ${promotion} di kunjungan berikutnya ya!` : '';
  const contactTxt = contactResolution ? ` Mohon berkenan menghubungi manajer kami via WhatsApp di ${contactResolution} agar kami dapat memberikan solusi terbaik.` : ' Mohon berkenan menghubungi tim kami melalui pesan langsung agar dapat kami bantu.';

  let opt1 = '';
  let opt2 = '';
  let opt3 = '';

  if (isPositive) {
    opt1 = `Halo Kak ${reviewerName}, terima kasih banyak atas ulasan bintang ${rating} dan kunjungannya ke ${businessName}! Senang sekali mengetahui pengalaman Kakak menyenangkan. Kami selalu berusaha memberikan yang terbaik untuk setiap pelanggan setia.${promoTxt} Ditunggu kedatangannya kembali ya Kak! ✨`;
    opt2 = `Terima kasih banyak Kak ${reviewerName} atas review positif dan bintang 5 untuk ${businessName}. Kami sangat senang bisa melayani Kakak. Sampai jumpa lagi!`;
    opt3 = `Hai Kak ${reviewerName}! Ulasan dari Kakak sungguh memberikan energi positif bagi seluruh staf di ${businessName}. Kami akan terus mempertahankan kualitas rasa dan pelayanan ramah kami.${promoTxt} Semoga hari Kakak menyenangkan! 🙏`;
  } else if (isNegative) {
    opt1 = `Halo Kak ${reviewerName}, terima kasih telah meluangkan waktu menyampaikan ulasan untuk ${businessName}. Kami memohon maaf yang sebesar-besarnya atas ketidaknyamanan yang Kakak alami. Hal ini menjadi bahan evaluasi serius bagi manajemen kami.${contactTxt} Terima kasih atas koreksinya demi perbaikan kami ke depan.`;
    opt2 = `Yth. Kak ${reviewerName}, mohon maaf atas pelayanan yang kurang berkenan di ${businessName}. Kritik Kakak sangat berharga untuk peningkatan kualitas kami.${contactTxt}`;
    opt3 = `Salam hangat Kak ${reviewerName}. Kami sangat menyesal mengetahui pengalaman Kakak kurang memuaskan saat berkunjung ke ${businessName}.${contactTxt} Kami berharap memiliki kesempatan untuk menyambut Kakak kembali dengan pelayanan yang jauh lebih baik.`;
  } else {
    opt1 = `Halo Kak ${reviewerName}, terima kasih atas kunjungan dan penilaian bintang 3 untuk ${businessName}. Masukan Kakak sangat kami hargai untuk perbaikan fasilitas dan layanan kami ke depannya. Ditunggu kunjungan berikutnya!`;
    opt2 = `Terima kasih Kak ${reviewerName} telah berkunjung ke ${businessName}. Kami terus berupaya meningkatkan kualitas agar kunjungan selanjutnya bisa memuaskan bintang 5.`;
    opt3 = `Hai Kak ${reviewerName}, terima kasih atas ulasan dan catatannya. Kami akan jadikan masukan Kakak sebagai evaluasi tim shift.${promoTxt} Sampai jumpa kembali!`;
  }

  return {
    analysis: {
      sentiment,
      sentimentScore,
      customerEmotion,
      highlightPoints: [
        reviewText.length > 25 ? reviewText.substring(0, 45) + '...' : 'Poin Pengalaman Layanan',
        'Kesesuaian Ekspektasi Pelanggan',
      ],
      actionAdvice: isPositive
        ? 'Pertahankan standar keramahan dan berikan apresiasi kepada staf yang bertugas.'
        : 'Hubungi pelanggan segera via jalur privat untuk meredakan kekecewaan dan berikan solusi kompensasi.',
    },
    options: [
      {
        id: 'opt-client-1',
        title: 'Opsi 1: Ramah & Hangat (Rekomendasi Utama)',
        badge: 'Paling Populer',
        replyText: opt1,
        characterCount: opt1.length,
        toneFit: 'Membangun kehangatan hubungan dengan pelanggan dan memperkuat branding bisnis.',
      },
      {
        id: 'opt-client-2',
        title: 'Opsi 2: Ringkas & Cepat',
        badge: 'Efisien',
        replyText: opt2,
        characterCount: opt2.length,
        toneFit: 'Tepat untuk menjawab ulasan dengan cepat dan lugas.',
      },
      {
        id: 'opt-client-3',
        title: 'Opsi 3: Detail & Solutif',
        badge: isPositive ? 'Dukungan Promo' : 'Solutif',
        replyText: opt3,
        characterCount: opt3.length,
        toneFit: 'Memberikan kesan bisnis yang profesional, mendengar, dan berorientasi pada kepuasan pelanggan.',
      },
    ],
  };
}
