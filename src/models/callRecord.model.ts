import { AstrologerFormData } from "./master.model";
import { Users } from "./users.model";

export interface CallRecords {
  _id: number;
  astrologer: AstrologerFormData["name"];
  user: Users["username"];
  astrologerName: string;
  username: string;
  callStatus: string;
  callDuration: number;
  createdAt: Date;
  updatedAt: Date;
  refund: boolean;
  wallet: number;
  date: string;
  time: string;
}

export interface GetCallRecords {
  status: number;
  message: string;
  length: number;
  success: boolean;
  data: CallRecords[];
}

export interface GetSearchCallRecord {
  status: number;
  message: string;
  data: CallRecords[];
  success: boolean;
  length: number;
}

export interface CallRecordReport {
  totalCompleted: number;
  totalFailed: number;
}

export interface GetCallRecordReport {
  status: number;
  message: string;
  data: CallRecordReport;
  success: boolean;
}

export interface CallRecordByAstrologer {
  _id: string;
  totalCompleted: number;
  astrologerName: string;
  astrologerId: string;
}

export interface GetCallRecordByAstrologer {
  status: number;
  message: string;
  data: CallRecordByAstrologer[];
  success: boolean;
}
