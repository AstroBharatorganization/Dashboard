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
  username: string;
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
}
