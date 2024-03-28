export interface Users {
  username: string;
  wallet: number;
  numberOfCall: number;
  numberOfRecharge: number;
  totalNewUsers: number;
  _id: string;
  name: string;
}

export interface GetUsers {
  message: string;
  status: number;
  success: boolean;
  data: Users[];
  length: number;
}

export interface UserChart{
  _id:string;
  count:number;
}

export interface GetUserChart{
  message: string;
  status: number;
  success: boolean;
  data: UserChart[]
}
