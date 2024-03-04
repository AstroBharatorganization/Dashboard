import { AstrologerFormData } from "./master.model";
import { Users } from "./users.model";

export interface WalletRecord {
  user: Users["username"];
  description?: string;
  razorPayPaymentId?: string;
  status?: string;
  astrologer?: AstrologerFormData["name"];
  transactionType?: "credit" | "debit";
  totalPayment?: number;
  userWalletAmount?: number;
  gstAmount?: number;
  couponUsed?: boolean;
  createdAt: Date;
  updatedAt: Date;
  date:string;
  time:string;
  username: string;
  refund: boolean;
  phonePePaymentId: string;
}

export interface GetWallet {
  status: number;
  message: string;
  length: number;
  success: boolean;
  data: WalletRecord[];
}

export interface GetSearchWallet {
  status: number;
  message: string;
  data: WalletRecord[];
  success: boolean;
  length: number;
}

export interface WalletChart {
  totalGstAmountDay: number;
  totalPaymentDay: number;
  totalUserWalletAmountDay: number;
  totalGstAmountMonth: number;
  totalPaymentMonth: number;
  totalUserWalletAmountMonth: number;
  totalCountDay: number;
  totalCountMonth: number;
}

export interface GetWalletChart {
  status: number;
  message: string;
  data: WalletChart;
  success: boolean;
}

export interface SearchWalletChart {
  totalGstAmount: number;
  totalUserWalletAmount: number;
  totalPayment: number;
  totalCount: number;
}

export interface GetSearchWalletChart {
  status: number;
  message: string;
  data: SearchWalletChart;
  success: boolean;
}
