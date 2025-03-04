export interface IAddress {
  id?: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  created_at?: Date;
  updated_at?: Date;
}
