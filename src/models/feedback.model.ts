export interface FeedbackRecord {
  _id: number;
  feedback: string;
  createdAt: Date;
}

export interface GetFeedBackRecord {
  status: number;
  message: string;
  success: boolean;
  length: number;
  data: FeedbackRecord[];
}
