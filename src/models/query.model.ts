import { CallRecords } from "./callRecord.model";
import { Users } from "./users.model";
import { WalletRecord } from "./wallet.model";

export interface QueryRecord {
  _id: number;
  type: string;
  walletRecord: WalletRecord[];
  callRecord: CallRecords;
  user: Users;
  query: string;
  closed: boolean;
  createdAt: Date;
  username: string;
}

export interface GetQueryRecord {
  status: number;
  message: string;
  success: boolean;
  length: number;
  data: QueryRecord[];
}

export interface GetQueryRecordById {
  status: number;
  message: string;
  success: boolean;
  data: QueryRecord;
}
