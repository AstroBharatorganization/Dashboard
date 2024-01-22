import { AstrologerFormData } from "./master.model";
import { Users } from "./users.model";

export interface IncomeRecord {
  astrologer: AstrologerFormData["name"];
  user: Users["username"];
  name: string;
  astrologerCut: number;
  companyCut: number;
  ratio: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetIncomeReport {
  status: number;
  message: string;
  length: number;
  success: boolean;
  data: IncomeRecord[];
}

export interface SearchIncomeData {
  status: number;
  message: string;
  data: IncomeRecord[];
  success: boolean;
}