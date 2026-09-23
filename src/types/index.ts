export interface ReviewReplyOption {
  id: string;
  title: string;
  badge: string;
  replyText: string;
  characterCount: number;
  toneFit: string;
}

export interface ReviewSentimentAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  customerEmotion: string;
  highlightPoints: string[];
  actionAdvice: string;
}

export interface GenerateReplyResult {
  analysis: ReviewSentimentAnalysis;
  options: ReviewReplyOption[];
}

export interface GoogleReviewItem {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  reviewDate: string;
  reviewText: string;
  locationName: string;
  status: 'unreplied' | 'replied' | 'pending_manual';
  replyText?: string;
  repliedAt?: string;
  repliedBy?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  tags?: string[];
}

export interface AutoPilotRule {
  id: string;
  title: string;
  condition: string;
  minRating: number;
  maxRating: number;
  action: 'auto_reply_instant' | 'auto_reply_delayed' | 'hold_for_manual' | 'notify_manager_wa';
  delayMinutes: number;
  selectedTone: string;
  includeKeywords: boolean;
  active: boolean;
  description: string;
}

export interface ReviewTemplate {
  id: string;
  category: 'fnb' | 'health' | 'hotel' | 'automotive' | 'retail' | 'general';
  categoryLabel: string;
  rating: number;
  situation: string;
  tone: string;
  templateText: string;
  tags: string[];
}

export interface PresetScenario {
  id: string;
  label: string;
  businessName: string;
  businessType: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  tone: string;
  badge: string;
}
