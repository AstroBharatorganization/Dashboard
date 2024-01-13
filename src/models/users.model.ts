export interface Users {
  username: string;
  wallet: number;
}

export interface GetUsers {
  message: string;
  status: number;
  success: boolean;
  data: Users[];
  length: number;
}
