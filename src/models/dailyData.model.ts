export interface DailyDataReport {
  date: Date;
  completedPaymentsCount: number;
  totalRechargeAmount: number;
  totalCompletedCalls: number;
  totalFailedCalls: number;
  totalNewUsers: number;
}

export interface PostDailyDataReport {
  status: number;
  message: string;
  success: boolean;
  data: DailyDataReport;
}

export interface GetDailyDataReport {
  status: number;
  message: string;
  success: boolean;
  data: DailyDataReport[];
}
