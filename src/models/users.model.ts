export interface Users {
  username: string;
  wallet: number;
  numberOfCall:number;
  numberOfRecharge:number;
}

export interface GetUsers {
  message: string;
  status: number;
  success: boolean;
  data: Users[];
  length: number;
}
