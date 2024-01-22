import { AstrologerFormData } from "./master.model";
import { Users } from "./users.model";

export interface CallRecords {
  astrologer: AstrologerFormData["name"];
  user: Users["username"];
  astrologerName: string;
  username: string;
  callStatus: string;
  callDuration: number;
  createdAt: Date;
  updatedAt: Date;
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
}
