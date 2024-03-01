export interface Users {
  username: string;
  wallet: number;
  numberOfCall:number;
}

export interface GetUsers {
  message: string;
  status: number;
  success: boolean;
  data: Users[];
  length: number;
}
