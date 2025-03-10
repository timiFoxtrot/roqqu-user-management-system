import { IAddress } from "./address";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  address?: IAddress | any
}
