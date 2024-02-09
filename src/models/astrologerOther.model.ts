export interface AstrologerStateRecord {
  _id: number;
  aid: string;
  callState: string;
  liveState: string;
  chatState: string;
  createdAt: Date;
}

export interface GetStateRecord {
  status: number;
  message: string;
  success: boolean;
  length: number;
  data: AstrologerStateRecord[];
}
